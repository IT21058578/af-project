import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { StatusCodes } from "http-status-codes";
import { PaymentService } from "../services/payment-services.js";
import { EPaymentErrors } from "../constants/constants.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const createCheckoutSession = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Request with url ${req.url} has reached controller function`);
		const sessionUrl = await PaymentService.createCheckoutSession();
		return res.redirect(sessionUrl);
	} catch (error) {
		log.error(
			`Error occurred when processing ${req.url} request ERR: ${error}`
		);
		handleControllerError(next, error, []);
	}
};

export const BookingController = {
	createCheckoutSession,
};
