import { ELocationError } from "../constants/constants.js";
import { Location } from "../models/location-model.js";
import {
	IAuthorizedUser,
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TLocation } from "../types/model-types.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";

const getLocation = async (locationId: string) => {
	const existingLocation = await Location.findById(locationId).exec();
	if (existingLocation == null) throw Error(ELocationError.LOCATION_NOT_FOUND);
	return existingLocation.toObject();
};

const searchLocations = async (
	locationSearchOptions: TExtendedPageOptions<TLocation>
) => {
	const paginationResult = (await Location.aggregate(
		buildPaginationPipeline(locationSearchOptions)
	)) as any as IPaginationResult<TLocation>;
	return buildPage(paginationResult, locationSearchOptions);
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

	return (await existingLocation.save()).toObject;
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
	return (await Location.create(newLocation)).toObject;
};

export const LocationService = {
	getLocation,
	editLocation,
	createLocation,
	deleteLocation,
	searchLocations,
};
