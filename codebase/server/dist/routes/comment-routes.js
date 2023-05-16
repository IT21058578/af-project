import express from "express";
import { CommentController } from "../controllers/comment-controller.js";
import validateSchema from "../middleware/validate-schema.js";
import { checkCommentFields, checkCommentId, checkReactionType, checkUserDetails, } from "../utils/schema-validation-utils.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
const router = express.Router();
// TODO: Search comments
router
    .route("/:commentId")
    .get(...validateSchema({
    ...checkCommentId,
}), CommentController.getComment)
    .put(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkCommentId,
    ...checkCommentFields(undefined, true),
}), CommentController.editComment)
    .delete(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkCommentId,
}), CommentController.deleteComment);
// Post Comments Like-Dislike Routes
// Here reactionType can be: like, dislike
router
    .route("/:commentId/:reactionType")
    .delete(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkCommentId,
    ...checkReactionType,
    ...checkUserDetails,
}), CommentController.deleteLikeDislikeComment)
    .post(authorizeRequest([Role.USER]), ...validateSchema({
    ...checkUserDetails,
    ...checkCommentId,
    ...checkReactionType,
    ...checkUserDetails,
}), CommentController.createlikeDislikeComment);
export default router;
