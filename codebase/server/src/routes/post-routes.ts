import express from "express";
import { PostController } from "../controllers/post-controller.js";
import authorizeRequest from "../middleware/authorize-request.js";
import { Role } from "../constants/constants.js";
import validateSchema from "../middleware/validate-schema.js";
import { checkPostId } from "../utils/schema-validation-utils.js";
import { CommentController } from "../controllers/comment-controller.js";

const router = express.Router();
// Post routes
router.post("/", PostController.createPost);

router.get("/search", PostController.searchPosts);

router
	.route("/:postId")
	.get(PostController.getPost)
	.put(authorizeRequest([Role.ADMIN]), PostController.editPost)
	.delete(authorizeRequest([Role.ADMIN]), PostController.deletePost);

// Post Like-Dislike routes
// Here reactionType can be: likes, dislikes
router.post(
	"/:postId/:reactionType/",
	authorizeRequest([Role.USER]),
	PostController.createlikeDislikePost
);

router
	.route("/:postId/:reactionType/:userId")
	.delete(authorizeRequest([Role.USER]), PostController.deleteLikeDislikePost);

router.post(
	"/:postId/comments",
	authorizeRequest([Role.USER]),
	...validateSchema({
		...checkPostId,
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

export default router;
