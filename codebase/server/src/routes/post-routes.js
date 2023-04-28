import express from "express";
import { PostController } from "../controllers/post-controller";
import commentRoutes from "./comment-routes";
import authorizeRequest from "../middleware/authorize-request";
import { Role } from "../constants/constants";

const router = express.Router();

// Post routes
router.post("/", PostController.createPost);

router.get("/search", PostController.searchPosts);

router
	.route("/:postId")
	.get(PostController.getPost)
	.post(authorizeRequest([Role.ADMIN]), PostController.editPost)
	.delete(authorizeRequest([Role.ADMIN]), PostController.deletePost);

// Post Like-Dislike routes
// Here reactionType can be: like, dislike
router.post(
	"/:postId/:reactionType/",
	authorizeRequest([Role.USER]),
	PostController.createlikeDislikePost
);
router
	.route("/:postId/:reactionType/:userId")
	.put(authorizeRequest([Role.USER]), PostController.editlikeDislikePost)
	.delete(authorizeRequest([Role.USER]), PostController.deleteLikeDislikePost);

// Post-Comment routes
router.use(commentRoutes);

export default router;
