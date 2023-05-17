import { Router } from "express";
import { UserController } from "../controllers/user-controller.js";
import validateSchema from "../middleware/validate-schema.js";
import { checkPageOptions, checkUserDetails, checkUserFields, checkUserId, } from "../utils/schema-validation-utils.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
const router = Router();
router.route("/search").get(...validateSchema({
    ...checkPageOptions,
    ...checkUserFields(true, "query"),
}), UserController.searchUsers);
router
    .route("/:userId")
    .get(...validateSchema({
    ...checkUserId,
}), UserController.getUser)
    .put(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkUserId,
    ...checkUserFields(true, "body"),
}), UserController.editUser)
    .delete(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkUserId,
}), UserController.deleteUser);
export default router;
