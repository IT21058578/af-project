import { ELodging, ETripPackageError } from "../constants/constants.js";
import { TripPackage } from "../models/package/package-model.js";
import { PackageTransformer } from "../transformers/package-transformer.js";
import {
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TPricingOptions, TTripPackage } from "../types/model-types.js";
import initializeLogger from "../utils/logger.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getTripPackage = async (tripPackageId: string) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId);
	if (existingTripPackage == null)
		throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
	existingTripPackage.views += 1;
	existingTripPackage.save();
	const tripPackageVO = await PackageTransformer.buildTripPackageVO(
		existingTripPackage.toObject()
	);
	return tripPackageVO;
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
			return await PackageTransformer.buildTripPackageVO(tripPackage);
		})
	);
	return buildPage({ ...rest, data: tripPackageVOs }, tripPackageSearchOptions);
};

const editTripPackage = async (
	tripPackageId: string,
	editedTripPackage: Partial<TTripPackage>,
	authorizedUserId: string
) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId);
	if (existingTripPackage == null)
		throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
	// FIXME: Dangerous type coercion
	Object.entries(editedTripPackage).forEach(([key, value]) => {
		(existingTripPackage as any)[key] =
			value ?? (existingTripPackage as any)[key];
	});
	existingTripPackage.lastUpdatedById = authorizedUserId;
	const updatedTripPackage = await existingTripPackage.save();
	const tripPackageVO = await PackageTransformer.buildTripPackageVO(
		updatedTripPackage.toObject()
	);
	return tripPackageVO;
};

const deleteTripPackage = async (tripPackageId: string) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId);
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
	const createdTripPackage = await TripPackage.create(newTripPackage);
	const tripPackageVO = await PackageTransformer.buildTripPackageVO(
		createdTripPackage.toObject()
	);
	return tripPackageVO;
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

export const TripPackageService = {
	calculatePrice,
	getTripPackage,
	editTripPackage,
	createTripPackage,
	deleteTripPackage,
	searchTripPackages,
};
