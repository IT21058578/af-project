import express from "express";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
import { LocationController } from "../controllers/location-controller.js";
import validateSchema from "../middleware/validate-schema.js";
import {
	checkLocationFields,
	checkLocationId,
	checkPageOptions,
} from "../utils/schema-validation-utils.js";

const router = express.Router();

// Location routes
router.route("/search").get(
	...validateSchema({
		...checkPageOptions,
		...checkLocationFields(true),
	}),
	LocationController.searchLocations
);
router.route("/").post(
	authorizeRequest([Role.ADMIN]),
	...validateSchema({
		...checkLocationFields(),
	}),
	LocationController.createLocation
);
router
	.route("/:locationId")
	.get(
		...validateSchema({ ...checkLocationId }),
		LocationController.getLocation
	)
	.put(
		authorizeRequest([Role.ADMIN]),
		...validateSchema({ ...checkLocationId, ...checkLocationFields(true) }),
		LocationController.editLocation
	)
	.delete(
		authorizeRequest([Role.ADMIN]),
		...validateSchema({ ...checkLocationId }),
		LocationController.deleteLocation
	);

export default router;
