import { NextFunction, Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ETripPackageError } from "../constants/constants.js";
import { handleControllerError } from "../utils/misc-utils.js";
import initializeLogger from "../utils/logger.js";
import { TExtendedPageOptions } from "../types/misc-types.js";
import { TTripPackage } from "../types/model-types.js";
import { TripPackageService } from "../services/package-service.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getTripPackage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const { tripPackageId } = req.params;
		const existingTripPackage = await TripPackageService.getTripPackage(
			tripPackageId
		);
		return res.status(StatusCodes.OK).json(existingTripPackage);
	} catch (error) {
		handleControllerError(next, error, [
			{
				reasons: [ETripPackageError.TRIP_PKG_NOT_FOUND],
				type: ReasonPhrases.NOT_FOUND,
				cause: "TripPackage with required ID could not be found",
			},
		]);
	}
};

const searchTripPackages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const locationSearchOptions = req.params as Partial<
			TExtendedPageOptions<TTripPackage>
		>;
		const locationPage = await TripPackageService.searchTripPackages(
			locationSearchOptions as any
		);
		log.info("Successfully processed searchPosts request");
		return res.send(StatusCodes.OK).json(locationPage);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const editTripPackage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const { tripPackageId } = req.params;
		const editedTripPackage = req.body;
		const authorizedUserId = req.headers["user-id"] as string;
		const existingTripPackage = await TripPackageService.editTripPackage(
			tripPackageId,
			editedTripPackage,
			authorizedUserId
		);
		return res.status(StatusCodes.OK).json(existingTripPackage);
	} catch (error) {
		handleControllerError(next, error, [
			{
				reasons: [ETripPackageError.TRIP_PKG_NOT_FOUND],
				type: ReasonPhrases.NOT_FOUND,
				cause: "TripPackage with required ID could not be found",
			},
		]);
	}
};

const deleteTripPackage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const { tripPackageId } = req.params;
		await TripPackageService.deleteTripPackage(tripPackageId);
		return res.status(StatusCodes.NO_CONTENT);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const createTripPackage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const newTripPackage = req.body;
		const authorizedUserId = req.headers["user-id"] as string;
		const savedTripPackage = await TripPackageService.createTripPackage(
			newTripPackage,
			authorizedUserId
		);
		return res.status(StatusCodes.OK).json(savedTripPackage);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

export const TripPackageController = {
	getTripPackage,
	editTripPackage,
	createTripPackage,
	deleteTripPackage,
	searchTripPackages,
};
