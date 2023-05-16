import { LocationService } from "../services/location-service.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ELocationError } from "../constants/constants.js";
import { handleControllerError } from "../utils/misc-utils.js";
import initializeLogger from "../utils/logger.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const getLocation = async (req, res, next) => {
    try {
        log.info("Intercepted getLocation request");
        const { locationId } = req.params;
        const existingLocation = await LocationService.getLocation(locationId);
        log.info("Successfully processed getLocation request");
        return res.status(StatusCodes.OK).json(existingLocation);
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [ELocationError.LOCATION_NOT_FOUND],
                type: ReasonPhrases.NOT_FOUND,
                cause: "Location with required ID could not be found",
            },
        ]);
    }
};
const searchLocations = async (req, res, next) => {
    try {
        log.info("Intercepted searchLocations request");
        const locationSearchOptions = req.query;
        const locationPage = await LocationService.searchLocations(locationSearchOptions);
        log.info("Successfully processed searchLocation request");
        return res.status(StatusCodes.OK).json(locationPage);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const editLocation = async (req, res, next) => {
    try {
        log.info("Intercepted editLocation request");
        const { locationId } = req.params;
        const editedLocation = req.body;
        const authorizedUserId = req.headers["user-id"];
        const existingLocation = await LocationService.editLocation(locationId, editedLocation, authorizedUserId);
        log.info("Successfully processed editLocation request");
        return res.status(StatusCodes.OK).json(existingLocation);
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [ELocationError.LOCATION_NOT_FOUND],
                type: ReasonPhrases.NOT_FOUND,
                cause: "Location with required ID could not be found",
            },
        ]);
    }
};
const deleteLocation = async (req, res, next) => {
    try {
        log.info("Intercepted deleteLocation request");
        const { locationId } = req.params;
        await LocationService.deleteLocation(locationId);
        log.info("Successfully processed deleteLocation request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const createLocation = async (req, res, next) => {
    try {
        log.info("Intercepted createLocation request");
        const newLocation = req.body;
        const authorizedUserId = req.headers["user-id"];
        const savedLocation = await LocationService.createLocation(newLocation, authorizedUserId);
        log.info("Successfully processed createLocation request");
        return res.status(StatusCodes.OK).json(savedLocation);
    }
    catch (error) {
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
