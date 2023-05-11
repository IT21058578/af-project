import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger.js";
import { handleControllerError } from "../utils/misc-utils.js";
import { StatusCodes } from "http-status-codes";
import { PaymentService } from "../services/payment-services.js";
import { EPaymentErrors } from "../constants/constants.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const handleStripeWebhookEvent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info(`Intercepted handleStripeWebhookEvent request`);
		const payload = req.body;
		const signature = req.headers["stripe-signature"] as string | undefined;
		if (signature === undefined)
			throw Error(EPaymentErrors.UNAUTHORIZED_WEBHOOK);
		await PaymentService.handleWebhookEvent(payload, signature);
		return res.status(StatusCodes.OK).send();
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

export const WebhookController = {
	handleStripeWebhookEvent,
};
