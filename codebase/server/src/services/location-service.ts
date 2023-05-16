import { ELocationError, EUserError } from "../constants/constants.js";
import { Location } from "../models/location-model.js";
import { User } from "../models/user-model.js";
import {
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TLocation } from "../types/model-types.js";
import { TLocationVO, TUserVO } from "../types/vo-types.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import { UserService } from "./user-service.js";
import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getLocation = async (locationId: string) => {
	const existingLocation = await Location.findById(locationId).exec();
	if (existingLocation == null) throw Error(ELocationError.LOCATION_NOT_FOUND);
	const locationVO = await buildLocationVO(existingLocation.toObject());
	return locationVO;
};

const searchLocations = async (
	locationSearchOptions: TExtendedPageOptions<TLocation>
) => {
	const { data, ...rest } = (
		await Location.aggregate(buildPaginationPipeline(locationSearchOptions))
	)[0] as any as IPaginationResult<TLocation>;
	const locationVOs = await Promise.all(
		data.map(async (location) => {
			return await buildLocationVO(location);
		})
	);
	return buildPage({ ...rest, data: locationVOs }, locationSearchOptions);
};

const editLocation = async (
	locationId: string,
	editedLocation: Partial<TLocation>,
	authorizedUserId: string
) => {
	const existingLocation = await Location.findById(locationId).exec();
	if (existingLocation == null) throw Error(ELocationError.LOCATION_NOT_FOUND);

	// FIXME: Dangerous type coercion
	Object.entries(editedLocation).forEach(([key, value]) => {
		(existingLocation as any)[key] = value ?? (existingLocation as any)[key];
	});
	existingLocation.lastUpdatedById = authorizedUserId;
	const updatedLocation = await existingLocation.save();
	const locationVO = await buildLocationVO(updatedLocation.toObject());
	return locationVO;
};

const deleteLocation = async (locationId: string) => {
	const existingLocation = await Location.findById(locationId).exec();
	if (existingLocation == null) throw Error(ELocationError.LOCATION_NOT_FOUND);
	await existingLocation.deleteOne();
};

const createLocation = async (
	newLocation: Partial<TLocation>,
	authorizedUserId: string
) => {
	newLocation.createdById = authorizedUserId;
	newLocation.lastUpdatedById = authorizedUserId;
	const createdLocation = await Location.create(newLocation);
	const locationVO = await buildLocationVO(createdLocation.toObject());
	return locationVO;
};

const buildLocationVO = async (location: TLocation): Promise<TLocationVO> => {
	console.log(location);
	const [createdByUser, lastUpdatedByUser] = await Promise.all([
		User.findById(location.createdById),
		User.findById(location.lastUpdatedById),
	]);

	let createdBy: TUserVO;
	if (createdByUser !== null) {
		createdBy = UserService.buildUserVO(createdByUser);
	} else {
		log.error(location);
		throw Error(EUserError.NOT_FOUND);
	}

	let lastUpdatedBy: TUserVO;
	if (lastUpdatedByUser !== null) {
		lastUpdatedBy = UserService.buildUserVO(lastUpdatedByUser);
	} else {
		log.error(location);
		throw Error(EUserError.NOT_FOUND);
	}

	return {
		id: location._id,
		name: location.name,
		createdAt: location.createdAt,
		updatedAt: location.updatedAt,
		address: location.address,
		imageData: location.imageData,
		createdBy,
		lastUpdatedBy,
	};
};

export const LocationService = {
	getLocation,
	editLocation,
	createLocation,
	deleteLocation,
	searchLocations,
	buildLocationVO,
};
