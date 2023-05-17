import express, { raw } from "express";
import { WebhookController } from "../controllers/webhook-controller.js";

const router = express.Router();

/**
 * An endpoint for handling events communicated by stripe. All internal logic
 * was made according to the linked article
 * @see https://stripe.com/docs/payments/checkout/fulfill-orders
 */
router
	.route("/stripe")
	.post(
		raw({ type: "application/json" }),
		WebhookController.handleStripeWebhookEvent
	);

export default router;
