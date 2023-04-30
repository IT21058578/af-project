import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import validateSchema from "../middleware/validate-schema";

const router = Router();

router.post(
	"/login",
	...validateSchema({
		email: { isEmail: true },
		password: { isString: true },
	}),
	AuthController.loginUser
);

router.put("/refresh", ...validateSchema({ refreshToken: { isJWT: true } }));

router.delete(
	"/logout",
	...validateSchema({ email: { isEmail: true } }),
	AuthController.logoutUser
);

router.post(
	"/register",
	...validateSchema({
		firstName: { isString: true },
		lastName: { isString: true },
		mobile: { isString: true },
		dateOfBirth: { toDate: true },
		isSubscribed: { isBoolean: true },
		email: { isEmail: true },
		password: { isString: true },
	}),
	AuthController.registerUser
);

router.put(
	"/reset-password",
	...validateSchema({
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
	...validateSchema({
		email: { isEmail: true },
		oldPassword: { isString: true },
		newPassword: { isString: true },
	}),
	AuthController.changePassword
);

export default router;
