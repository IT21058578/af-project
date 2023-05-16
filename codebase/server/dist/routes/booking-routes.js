import express from "express";
import { BookingController } from "../controllers/booking-controller.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { ELodging, ETransport, Role } from "../constants/constants.js";
import validateSchema from "../middleware/validate-schema.js";
import { checkBookingFields, checkBookingId, checkUserDetails, } from "../utils/schema-validation-utils.js";
const router = express.Router();
/**
 * An endpoint made for handling creation of stripe payment sessions.
 * All the necessary logic here was made following the stripe documentation
 * @see https://stripe.com/docs/checkout/quickstart
 */
router.route("/session").post(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    tripPackageId: {
        isMongoId: true,
        errorMessage: "tripPackageId must be an ObjectId",
    },
    "pricingOptions.persons": {
        isInt: true,
        errorMessage: "pricingOptions.persons must be an Integer",
    },
    "pricingOptions.lodging": {
        exists: true,
        isIn: { options: Object.values(ELodging) },
        errorMessage: `pricingOptions.lodgings must be one of ${Object.values(ELodging).toString()}`,
    },
    "pricingOptions.transport": {
        exists: true,
        isIn: { options: Object.values(ETransport) },
        errorMessage: `pricingOptions.lodgings must be one of ${Object.values(ETransport).toString()}`,
    },
    "pricingOptions.withFood": {
        isBoolean: true,
        errorMessage: "pricingOptions.withFood must be a Boolean",
    },
}), BookingController.createCheckoutSession);
router.route("/search").get(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkBookingFields(true, "query"),
}), BookingController.searchBookings);
router.route("/:bookingId").get(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkBookingId,
}), BookingController.getBooking);
export default router;
