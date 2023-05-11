import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { StatusCodes } from "http-status-codes";
import { PaymentService } from "../services/payment-services.js";
import { EPaymentErrors } from "../constants/constants.js";
import { TPricingOptions } from "../types/model-types.js";

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

export const BookingController = {
	createCheckoutSession,
};
