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
		log.info("Intercepted getTripPackage request");
		const { tripPackageId } = req.params;
		const existingTripPackage = await TripPackageService.getTripPackage(
			tripPackageId
		);
		log.info("Successfully processed getTripPackage request");
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
		log.info("Intercepted searchTripPackages request");
		const tripPackageSearchOptions = req.query as Partial<
			TExtendedPageOptions<TTripPackage>
		>;
		const tripPackagePage = await TripPackageService.searchTripPackages(
			tripPackageSearchOptions as any
		);
		log.info("Successfully processed searchTripPackages request");
		return res.status(StatusCodes.OK).json(tripPackagePage);
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
		log.info("Intercepted editTripPackage request");
		const { tripPackageId } = req.params;
		const editedTripPackage = req.body;
		const authorizedUserId = req.headers["user-id"] as string;
		const existingTripPackage = await TripPackageService.editTripPackage(
			tripPackageId,
			editedTripPackage,
			authorizedUserId
		);
		log.info("Successfully processed editTripPackage request");
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
		log.info("Intercepted deleteTripPackage request");
		const { tripPackageId } = req.params;
		await TripPackageService.deleteTripPackage(tripPackageId);
		log.info("Successfully processed deleteTripPackage request");
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
		log.info("Intercepted createTripPackage request");
		const newTripPackage = req.body;
		const authorizedUserId = req.headers["user-id"] as string;
		const savedTripPackage = await TripPackageService.createTripPackage(
			newTripPackage,
			authorizedUserId
		);
		log.info("Successfully processed createTripPackage request");
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
