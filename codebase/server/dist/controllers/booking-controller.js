import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { PaymentService } from "../services/payment-services.js";
import { EBookingError } from "../constants/constants.js";
import { BookingService } from "../services/booking-service.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const createCheckoutSession = async (req, res, next) => {
    try {
        log.info(`Intercepted createCheckoutSession request`);
        const { tripPackageId, pricingOptions, } = req.body;
        const userId = req.headers["user-id"];
        const sessionUrl = await PaymentService.createCheckoutSession(tripPackageId, pricingOptions, userId);
        return res.redirect(sessionUrl);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const getBooking = async (req, res, next) => {
    try {
        log.info("Intercepted getBooking request");
        const { bookingId } = req.params;
        const existingBooking = await BookingService.getBooking(bookingId);
        log.info("Successfully processed getBooking request");
        return res.status(StatusCodes.OK).json(existingBooking);
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [EBookingError.NOT_FOUND],
                type: ReasonPhrases.NOT_FOUND,
                cause: "Booking with required ID could not be found",
            },
        ]);
    }
};
const searchBookings = async (req, res, next) => {
    try {
        log.info("Intercepted searchBookings request");
        const bookingSearchOptions = req.query;
        const bookingPage = await BookingService.searchBookings(bookingSearchOptions);
        log.info("Successfully processed searchBookings request");
        return res.status(StatusCodes.OK).json(bookingPage);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
export const BookingController = {
    createCheckoutSession,
    getBooking,
    searchBookings,
};
