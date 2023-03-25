import { Router } from "express";
import { AuthController } from "../controllers/auth-controller";
import validateSchema from "../middleware/validate-schema";

const router = Router();

router.post("/login", ...validateSchema({}), AuthController.loginUser);

router.delete("/logout", ...validateSchema({}), AuthController.logoutUser);

router.post("/register", ...validateSchema({}), AuthController.registerUser);

router.post("/reset-password", ...validateSchema({}), AuthController.resetPassword);

router.post("/forgot-password", ...validateSchema({}), AuthController.forgotPassword);

router.post("/change-password", ...validateSchema({}), AuthController.changePassword);

export default router;