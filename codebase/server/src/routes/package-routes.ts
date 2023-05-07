import express from "express";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
import validateSchema from "../middleware/validate-schema.js";
import {
	checkTripPackageFields,
	checkTripPackageId,
	checkPageOptions,
	checkUserDetails,
} from "../utils/schema-validation-utils.js";
import { TripPackageController } from "../controllers/package-controller.js";

const router = express.Router();

// TripPackage routes
router.route("/search").get(
	...validateSchema({
		...checkUserDetails,
		...checkPageOptions,
		...checkTripPackageFields(true),
	}),
	TripPackageController.searchTripPackages
);
router.route("/").post(
	authorizeRequest([Role.ADMIN]),
	...validateSchema({
		...checkUserDetails,
		...checkTripPackageFields(),
	}),
	TripPackageController.createTripPackage
);
router
	.route("/:tripPackageId")
	.get(
		...validateSchema({ ...checkTripPackageId }),
		TripPackageController.getTripPackage
	)
	.put(
		authorizeRequest([Role.ADMIN]),
		...validateSchema({
			...checkUserDetails,
			...checkTripPackageId,
			...checkTripPackageFields(true),
		}),
		TripPackageController.editTripPackage
	)
	.delete(
		authorizeRequest([Role.ADMIN]),
		...validateSchema({ ...checkUserDetails, ...checkTripPackageId }),
		TripPackageController.deleteTripPackage
	);

export default router;
