import { ELocationError } from "../constants/constants.js";
import { Location } from "../models/location-model.js";
import {
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TLocation } from "../types/model-types.js";
import { PageUtils, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import initializeLogger from "../utils/logger.js";
import { LocationTransformer } from "../transformers/location-transformer.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getLocation = async (locationId: string) => {
	const existingLocation = await Location.findById(locationId);
	if (existingLocation == null) throw Error(ELocationError.LOCATION_NOT_FOUND);
	const locationVO = await LocationTransformer.buildLocationVO(
		existingLocation.toObject()
	);
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
			return await LocationTransformer.buildLocationVO(location);
		})
	);
	return PageUtils.buildPage(
		{ ...rest, data: locationVOs },
		locationSearchOptions
	);
};

const editLocation = async (
	locationId: string,
	editedLocation: Partial<TLocation>,
	authorizedUserId: string
) => {
	const existingLocation = await Location.findById(locationId);
	if (existingLocation == null) throw Error(ELocationError.LOCATION_NOT_FOUND);

	// FIXME: Dangerous type coercion
	Object.entries(editedLocation).forEach(([key, value]) => {
		(existingLocation as any)[key] = value ?? (existingLocation as any)[key];
	});
	existingLocation.lastUpdatedById = authorizedUserId;
	const updatedLocation = await existingLocation.save();
	const locationVO = await LocationTransformer.buildLocationVO(
		updatedLocation.toObject()
	);
	return locationVO;
};

const deleteLocation = async (locationId: string) => {
	const existingLocation = await Location.findById(locationId);
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
	const locationVO = await LocationTransformer.buildLocationVO(
		createdLocation.toObject()
	);
	return locationVO;
};

export const LocationService = {
	getLocation,
	editLocation,
	createLocation,
	deleteLocation,
	searchLocations,
};
