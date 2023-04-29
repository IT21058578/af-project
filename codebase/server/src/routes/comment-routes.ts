import express from "express";
import { CommentController } from "../controllers/comment-controller";
import validateSchema from "../middleware/validate-schema";
import {
	checkCommentId,
	checkReactionType,
	checkUserDetails,
} from "../utils/schema-validation-utils";
import authorizeRequest from "../middleware/authorize-request";
import { Role } from "../constants/constants";

const router = express.Router();

// Post Comments Routes
router.post(
	"/",
	authorizeRequest([Role.USER]),
	...validateSchema({
		postId: {
			isMongoId: true,
			errorMessage: "postId must be an ObjectId",
			in: ["params"],
		},
		parentId: {
			isMongoId: true,
			optional: true,
			errorMessage: "parentId must be an ObjectId",
		},
		text: {
			isString: true,
			errorMessage: "Text must be a string and not empty",
		},
	}),
	CommentController.createComment
);

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
router.post(
	"/:commentId/:reactionType/",
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkCommentId,
		...checkReactionType,
		...checkUserDetails,
	}),
	CommentController.createlikeDislikeComment
);
router.route("/:commentId/:reactionType/:userId").delete(
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkCommentId,
		...checkReactionType,
		...checkUserDetails,
		userId: {
			isMongoId: true,
			errorMessage: "userId must be an ObjectId",
			in: ["params"],
		},
	}),
	CommentController.deleteLikeDislikeComment
);

export default router;
