import express, { json, raw } from "express";
import { BookingController } from "../controllers/booking-controller.js";

const router = express.Router();

/**
 * An endpoint made for handling creation of stripe payment sessions.
 * All the necessary logic here was made following the stripe documentation
 * @see https://stripe.com/docs/checkout/quickstart
 */
router.route("/session").post(json(), BookingController.createCheckoutSession);

export default router;
