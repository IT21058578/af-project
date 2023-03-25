import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const router = Router();

router.delete("/", ...validateSchema({}), UserController.deleteUser);

router.patch("/", ...validateSchema({}), UserController.editUser);

router.get("/", ...validateSchema({}), UserController.getUser);

router.get("/", ...validateSchema({}), UserController.getUsers);

export default router;