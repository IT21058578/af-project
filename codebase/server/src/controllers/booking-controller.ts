import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { PaymentService } from "../services/payment-services.js";
import { EBookingError, EPaymentErrors } from "../constants/constants.js";
import { TBooking, TPricingOptions } from "../types/model-types.js";
import { BookingService } from "../services/booking-service.js";
import { TExtendedPageOptions } from "../types/misc-types.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const createCheckoutSession = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Intercepted createCheckoutSession request`);
		const {
			tripPackageId,
			pricingOptions,
		}: { tripPackageId: string; pricingOptions: TPricingOptions } = req.body;
		const userId = req.headers["user-id"] as string;
		const sessionUrl = await PaymentService.createCheckoutSession(
			tripPackageId,
			pricingOptions,
			userId
		);
		return res.redirect(sessionUrl);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const getBooking = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted getBooking request");
		const { bookingId } = req.params;
		const existingBooking = await BookingService.getBooking(bookingId);
		log.info("Successfully processed getBooking request");
		return res.status(StatusCodes.OK).json(existingBooking);
	} catch (error) {
		handleControllerError(next, error, [
			{
				reasons: [EBookingError.NOT_FOUND],
				type: ReasonPhrases.NOT_FOUND,
				cause: "Booking with required ID could not be found",
			},
		]);
	}
};

const searchBookings = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted searchBookings request");
		const bookingSearchOptions = req.query as Partial<
			TExtendedPageOptions<TBooking>
		>;
		const bookingPage = await BookingService.searchBookings(
			bookingSearchOptions as any
		);
		log.info("Successfully processed searchBookings request");
		return res.status(StatusCodes.OK).json(bookingPage);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

export const BookingController = {
	createCheckoutSession,
	getBooking,
	searchBookings,
};
