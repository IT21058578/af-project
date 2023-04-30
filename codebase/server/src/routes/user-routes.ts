import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import validateSchema from "../middleware/validate-schema";

const router = Router();

router.delete(
	"/:id",
	...validateSchema(
		{
			email: { isEmail: true },
			password: { isString: true },
		},
		["body"]
	),
	UserController.deleteUser
);

router.put(
	"/:id",
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

export default router;
