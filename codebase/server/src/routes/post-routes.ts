import express from "express";
import { PostController } from "../controllers/post-controller.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
import validateSchema from "../middleware/validate-schema.js";
import {
	checkCommentFields,
	checkPageOptions,
	checkPostFields,
	checkPostId,
	checkReactionType,
	checkUserDetails,
	checkUserId,
} from "../utils/schema-validation-utils.js";
import { CommentController } from "../controllers/comment-controller.js";

const router = express.Router();

// Post routes
router.post(
	"/",
	authorizeRequest([Role.ADMIN]),
	...validateSchema({
		...checkUserDetails,
		...checkPostFields(),
	}),
	PostController.createPost
);

router.get(
	"/search",
	...validateSchema({
		...checkPageOptions,
		...checkPostFields(true, "query"),
	}),
	PostController.searchPosts
);

router
	.route("/:postId")
	.get(
		...validateSchema({
			...checkPostId,
		}),
		PostController.getPost
	)
	.put(
		authorizeRequest([Role.ADMIN]),
		...validateSchema({
			...checkUserDetails,
			...checkPostId,
			...checkPostFields(true),
		}),
		PostController.editPost
	)
	.delete(
		authorizeRequest([Role.ADMIN]),
		...validateSchema({
			...checkUserDetails,
			...checkPostId,
		}),
		PostController.deletePost
	);

// Post Like-Dislike routes
// Here reactionType can be: likes, dislikes
router.post(
	"/:postId/:reactionType/",
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkUserDetails,
		...checkPostId,
		...checkReactionType,
	}),
	PostController.createlikeDislikePost
);

router.route("/:postId/:reactionType/:userId").delete(
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkUserDetails,
		...checkUserId,
		...checkPostId,
		...checkReactionType,
	}),
	PostController.deleteLikeDislikePost
);

router.post(
	"/:postId/comments",
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkUserDetails,
		...checkPostId,
		...checkCommentFields(),
	}),
	CommentController.createComment
);

export default router;
