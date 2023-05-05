import { ETripPackageError } from "../constants/constants.js";
import { TripPackage } from "../models/package-model.js";
import {
	IAuthorizedUser,
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { TTripPackage } from "../types/model-types.js";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";

const getTripPackage = async (tripPackageId: string) => {
	const existingTripPackage = await TripPackage.findById(tripPackageId).exec();
	if (existingTripPackage == null)
		throw Error(ETripPackageError.TRIP_PKG_NOT_FOUND);
	return existingTripPackage.toObject();
};

const searchTripPackages = async (
	tripPackageSearchOptions: TExtendedPageOptions<TTripPackage>
) => {
	const paginationResult = (await TripPackage.aggregate(
		buildPaginationPipeline(tripPackageSearchOptions)
	)) as any as IPaginationResult<TTripPackage>;
	return buildPage(paginationResult, tripPackageSearchOptions);
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
	existingTripPackage.lastUpdatedBy = authorizedUserId;
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
	newTripPackage.createdBy = authorizedUserId;
	return (await TripPackage.create(newTripPackage)).toObject;
};

export const TripPackageService = {
	getTripPackage,
	editTripPackage,
	createTripPackage,
	deleteTripPackage,
	searchTripPackages,
};
