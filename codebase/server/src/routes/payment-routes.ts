import express from "express";
import { PaymentController } from "../controllers/payment-controller.js";

const router = express.Router();

/**
 * An endpoint made for handling creation of stripe payment sessions.
 * All the necessary logic here was made following the stripe documentation
 * @see https://stripe.com/docs/checkout/quickstart
 */
router.route("/session").post(PaymentController.createCheckoutSession);

/**
 * An endpoint for handling events communicated by stripe. All internal logic
 * was made according to the linked article
 * @see https://stripe.com/docs/payments/checkout/fulfill-orders
 */
router.route("/webhook").post(PaymentController.handleWebhookEvent);

export default router;
