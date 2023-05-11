import {
	ELocationError,
	ELodging,
	ETripPackageError,
	EUserError,
} from "../constants/constants.js";
import { Location } from "../models/location-model.js";
import { TripPackage } from "../models/package-model.js";
import { User } from "../models/user-model.js";
import {
	IAuthorizedUser,
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import {
	TLocation,
	TLodging,
	TPricingOptions,
	TTransport,
	TTripPackage,
	TUser,
} from "../types/model-types.js";
import { TLocationVO, TTripPackageVO, TUserVO } from "../types/vo-types.js";
import initializeLogger from "../utils/logger.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import { LocationService } from "./location-service.js";
import { UserService } from "./user-service.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getTripPackage = async (tripPackageId: string) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
	if (existingTripPackage == null)
		throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
	return existingTripPackage.toObject();
};

const searchTripPackages = async (
	tripPackageSearchOptions: TExtendedPageOptions<TTripPackage>
) => {
	const { data, ...rest } = (
		await TripPackage.aggregate(
			buildPaginationPipeline(tripPackageSearchOptions)
		)
	)[0] as any as IPaginationResult<TTripPackage>;
	const tripPackageVOs = await Promise.all(
		data.map(async (tripPackage) => {
			return await buildTripPackageVO(tripPackage);
		})
	);
	return buildPage({ ...rest, data: tripPackageVOs }, tripPackageSearchOptions);
};

const editTripPackage = async (
	tripPackageId: string,
	editedTripPackage: Partial<TTripPackage>,
	authorizedUserId: string
) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
	if (existingTripPackage == null)
		throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
	// FIXME: Dangerous type coercion
	Object.entries(editedTripPackage).forEach(([key, value]) => {
		(existingTripPackage as any)[key] =
			value ?? (existingTripPackage as any)[key];
	});
	existingTripPackage.lastUpdatedById = authorizedUserId;
	return (await existingTripPackage.save()).toObject;
};

const deleteTripPackage = async (tripPackageId: string) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
	if (existingTripPackage == null)
		throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
	await existingTripPackage.deleteOne();
};

const createTripPackage = async (
	newTripPackage: Partial<TTripPackage>,
	authorizedUserId: string
) => {
	newTripPackage.createdById = authorizedUserId;
	newTripPackage.lastUpdatedById = authorizedUserId;
	return (await TripPackage.create(newTripPackage)).toObject;
};

const calculatePrice = (
	{ price }: Partial<TTripPackage>,
	pricingOptions: TPricingOptions
) => {
	if (price) {
		let result = 0;
		const { lodging, perPerson, perPersonFood, transport } = price;
		result += perPerson ?? 0 * pricingOptions.persons;
		result += lodging?.[pricingOptions.lodging] ?? 0;
		result += transport?.[pricingOptions.transport] ?? 0;
		result +=
			pricingOptions.lodging === ELodging.THREE_STAR && pricingOptions.withFood
				? perPersonFood ?? 0 * pricingOptions.persons
				: 0;
		return result;
	} else {
		throw Error(ETripPackageError.PRICE_UNDEFINED);
	}
};

const buildTripPackageVO = async (
	tripPackage: TTripPackage
): Promise<TTripPackageVO> => {
	// Start fetching locations
	const locationVOPromises = [];
	for (const { locationId } of tripPackage.plan) {
		// We are pushing a promise of a called getter function.
		// This function could easily be elsewhere, this is for conciseness
		locationVOPromises.push(
			(async () => {
				const location = await Location.findById(locationId);
				return LocationService.buildLocationVO(location as TLocation);
			})()
		);
	}
	// Start fetching and wait for both users
	const [createdByUser, lastUpdatedByUser] = await Promise.all([
		User.findById(tripPackage.createdById),
		User.findById(tripPackage.lastUpdatedById),
	]);

	let createdBy: TUserVO;
	if (createdByUser !== null) {
		createdBy = UserService.buildUserVO(createdByUser);
	} else {
		throw Error(EUserError.NOT_FOUND);
	}

	let lastUpdatedBy: TUserVO;
	if (lastUpdatedByUser !== null) {
		lastUpdatedBy = UserService.buildUserVO(lastUpdatedByUser);
	} else {
		throw Error(EUserError.NOT_FOUND);
	}

	/**
	 * Due to the way these build functions are written. There are lots of requests going
	 * to the database. The latency this introduced was optimized by parallelizing the
	 * requests aswell as the building of the object.
	 */
	// const plan: TTripPackageVO["plan"] = [];
	// const locationPromises = [];
	// for (const { locationId } of tripPackage.plan) {
	// 	const locationPromise = Location.findById(locationId);
	// 	locationPromises.push(locationPromise);
	// }
	// const locations = await Promise.all(locationPromises);
	// const locationVOPromises = [];
	// for (const location of locations) {
	// 	const locationVOPromise: Promise<TLocationVO> =
	// 		LocationService.buildLocationVO(location as TLocation);
	// 	locationVOPromises.push(locationVOPromise);
	// }
	// const locationVOs = await Promise.all(locationVOPromises);
	// locationVOs.forEach((item, idx) => {
	// 	plan.push({
	// 		...item,
	// 		activities: tripPackage.plan.at(idx)?.activities ?? [],
	// 	});
	// });

	const plan: TTripPackageVO["plan"] = [];
	const locationVOs = await Promise.all(locationVOPromises);
	locationVOs.forEach((item, idx) => {
		plan.push({
			...item,
			activities: tripPackage.plan.at(idx)?.activities ?? [],
		});
	});

	return {
		id: tripPackage.id,
		name: tripPackage.name,
		description: tripPackage.description,
		createdBy,
		createdAt: tripPackage.createdAt,
		lastUpdatedBy,
		updatedAt: tripPackage.updatedAt,
		price: tripPackage.price,
		discount: tripPackage.discount,
		limitedDateRange: tripPackage.limitedDateRange,
		totalDistance: tripPackage.totalDistance,
		views: tripPackage.views,
		plan,
	};
};

export const TripPackageService = {
	calculatePrice,
	getTripPackage,
	editTripPackage,
	createTripPackage,
	deleteTripPackage,
	searchTripPackages,
};
