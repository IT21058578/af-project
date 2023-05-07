import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import validateSchema from "../middleware/validate-schema";

const router = Router();

router.post(
	"/login",
	...validateSchema(
		{
			email: { isEmail: true, optional: false },
			password: { isString: true, optional: false },
		},
		["body"]
	),
	AuthController.loginUser
);

router.delete(
	"/logout",
	...validateSchema({ email: { isEmail: true, option: false } }, ["body"]),
	AuthController.logoutUser
);

router.post(
	"/register",
	...validateSchema(
		{
			firstName: { isString: true, optional: false },
			lastName: { isString: true, optional: false },
			mobile: { isString: true, optional: false },
			dateOfBirth: { isDate: true, optional: false },
			isSubscribed: { isBoolean: true, optional: false },
			email: { isEmail: true, optional: false },
			password: { isString: true, optional: false },
		},
		["body"]
	),
	AuthController.registerUser
);

router.post(
	"/reset-password",
	...validateSchema(
		{
			resetToken: { isUUID: true, optional: false },
			newPassword: { isString: true, optional: false },
		},
		["body"]
	),
	AuthController.resetPassword
);

router.post(
	"/forgot-password",
	...validateSchema(
		{
			email: { isEmail: true, optional: false },
		},
		["body"]
	),
	AuthController.forgotPassword
);

router.post(
	"/change-password",
	...validateSchema(
		{
			email: { isEmail: true, optional: false },
			oldPassword: { isString: true, optional: false },
			newPassword: { isString: true, optional: false },
		},
		["body"]
	),
	AuthController.changePassword
);

export default router;
