import { NextFunction, Request, Response } from "express";
import { LocationService } from "../services/location-service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ELocationError } from "../constants/constants.js";
import { handleControllerError } from "../utils/misc-utils.js";
import initializeLogger from "../utils/logger.js";
import { TExtendedPageOptions } from "../types/misc-types.js";
import { TLocation } from "../types/model-types.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getLocation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const { locationId } = req.params;
		const existingLocation = await LocationService.getLocation(locationId);
		return res.status(StatusCodes.OK).json(existingLocation);
	} catch (error) {
		handleControllerError(next, error, [
			{
				reasons: [ELocationError.LOCATION_NOT_FOUND],
				type: ReasonPhrases.NOT_FOUND,
				cause: "Location with required ID could not be found",
			},
		]);
	}
};

const searchLocations = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const locationSearchOptions = req.params as Partial<
			TExtendedPageOptions<TLocation>
		>;
		const locationPage = await LocationService.searchLocations(
			locationSearchOptions as any
		);
		log.info("Successfully processed searchPosts request");
		return res.send(StatusCodes.OK).json(locationPage);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const editLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const { locationId } = req.params;
		const editedLocation = req.body;
		const authorizedUserId = req.headers["user-id"] as string;
		const existingLocation = await LocationService.editLocation(
			locationId,
			editedLocation,
			authorizedUserId
		);
		return res.status(StatusCodes.OK).json(existingLocation);
	} catch (error) {
		handleControllerError(next, error, [
			{
				reasons: [ELocationError.LOCATION_NOT_FOUND],
				type: ReasonPhrases.NOT_FOUND,
				cause: "Location with required ID could not be found",
			},
		]);
	}
};

const deleteLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const { locationId } = req.params;
		await LocationService.deleteLocation(locationId);
		return res.status(StatusCodes.NO_CONTENT);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const createLocation = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const newLocation = req.body;
		const authorizedUserId = req.headers["user-id"] as string;
		const savedLocation = await LocationService.createLocation(
			newLocation,
			authorizedUserId
		);
		return res.status(StatusCodes.OK).json(savedLocation);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

export const LocationController = {
	getLocation,
	editLocation,
	createLocation,
	deleteLocation,
	searchLocations,
};
