import { Router } from "express";
import { AuthController } from "../controllers/auth-controller.js";
import validateSchema from "../middleware/validate-schema.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";

const router = Router();

router.post(
	"/login",
	...validateSchema({
		email: { isEmail: true },
		password: { isString: true },
	}),
	AuthController.loginUser
);

router.put(
	"/refresh",
	authorizeRequest([Role.USER]),
	...validateSchema({
		refreshToken: { isJWT: true },
		"user-id": { in: ["headers"], isMongoId: true },
	}),
	AuthController.refreshTokens
);

router.delete(
	"/logout",
	authorizeRequest([Role.USER]),
	...validateSchema({ "user-id": { in: ["headers"], isMongoId: true } }),
	AuthController.logoutUser
);

router.post(
	"/register",
	...validateSchema({
		firstName: { isString: true, errorMessage: "First Name cannot be empty" },
		lastName: { isString: true, errorMessage: "Last Name Cannot be empty" },
		mobile: { isString: true, errorMessage: "Mobile number must be valid" },
		dateOfBirth: { toDate: true, errorMessage: "Date of Birth must be a date" },
		isSubscribed: {
			isBoolean: true,
			errorMessage: "isSubscribed must be a boolean",
		},
		email: { isEmail: true, errorMessage: "Email must be valid" },
		password: { isString: true, errorMessage: "Password cannot be empty" },
	}),
	AuthController.registerUser
);

router.put(
	"/authorize",
	...validateSchema({
		email: { isEmail: true, in: ["query"] },
		authorizationToken: { isUUID: true, in: ["query"] },
	}),
	AuthController.authorizeUser
);

router.put(
	"/reset-password",
	...validateSchema({
		email: { isString: true },
		resetToken: { isUUID: true },
		newPassword: { isString: true },
	}),
	AuthController.resetPassword
);

router.put(
	"/forgot-password",
	...validateSchema({
		email: { isEmail: true },
	}),
	AuthController.forgotPassword
);

router.put(
	"/change-password",
	authorizeRequest([Role.USER]),
	...validateSchema({
		"user-id": { in: ["headers"], isMongoId: true },
		oldPassword: { isString: true },
		newPassword: { isString: true },
	}),
	AuthController.changePassword
);

export default router;
