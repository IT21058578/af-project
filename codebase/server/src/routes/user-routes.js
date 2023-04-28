import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import validateSchema from "../middleware/validate-schema.js";

const router = Router();

router.delete(
	"/",
	...validateSchema(
		{
			email: { isEmail: true, optional: false },
			password: { isString: true, optional: false },
		},
		["body"]
	),
	UserController.deleteUser
);

router.patch(
	"/",
	...validateSchema(
		{
			firstName: { isString: true },
			lastName: { isString: true },
			mobile: { isString: true },
			dateOfBirth: { isDate: true },
			isSubscribed: { isBoolean: true },
			email: { isEmail: true },
			password: { isString: true },
		},
		["body"]
	),
	UserController.editUser
);

router.get(
	"/:id",
	...validateSchema({ id: { isMongoId: true } }, ["params"]),
	UserController.getUser
);

// TODO: Create user search validation schema
router.get("/", ...validateSchema({}), UserController.getUsers);

export default router;
