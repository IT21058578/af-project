import express, { json, raw } from "express";
import { BookingController } from "../controllers/booking-controller.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
import validateSchema from "../middleware/validate-schema.js";
import { checkUserDetails } from "../utils/schema-validation-utils.js";

const router = express.Router();

/**
 * An endpoint made for handling creation of stripe payment sessions.
 * All the necessary logic here was made following the stripe documentation
 * @see https://stripe.com/docs/checkout/quickstart
 */
router.route("/session").post(
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkUserDetails,
	}),
	BookingController.createCheckoutSession
);

export default router;
