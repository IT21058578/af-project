import express from "express";
import { CommentController } from "../controllers/comment-controller.js";
import validateSchema from "../middleware/validate-schema.js";
import {
	checkCommentId,
	checkReactionType,
	checkUserDetails,
} from "../utils/schema-validation-utils.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";

const router = express.Router();

// TODO: Search comments
router
	.route("/:commentId")
	.get(
		...validateSchema({
			...checkCommentId,
		}),
		CommentController.getComment
	)
	.put(
		authorizeRequest([Role.USER]),
		...validateSchema({
			...checkCommentId,
			text: {
				isString: true,
				errorMessage: "Text must be a string and not empty",
			},
		}),
		CommentController.editComment
	)
	.delete(
		authorizeRequest([Role.USER]),
		...validateSchema({
			...checkCommentId,
		}),
		CommentController.deleteComment
	);

// Post Comments Like-Dislike Routes
// Here reactionType can be: like, dislike
router
	.route("/:commentId/:reactionType")
	.delete(
		authorizeRequest([Role.USER]),
		...validateSchema({
			...checkCommentId,
			...checkReactionType,
			...checkUserDetails,
		}),
		CommentController.deleteLikeDislikeComment
	)
	.post(
		authorizeRequest([Role.USER]),
		...validateSchema({
			...checkCommentId,
			...checkReactionType,
			...checkUserDetails,
		}),
		CommentController.createlikeDislikeComment
	);

export default router;
