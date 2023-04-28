import { CommentController } from "../controllers/comment-controller";

const router = express.Router();

// Post Comments Routes
router.post(
	"/",
	authorizeRequest([Role.USER]),
	CommentController.createComment
);

router
	.route("/:commentId")
	.get(CommentController.getComment)
	.post(authorizeRequest([Role.USER]), CommentController.editComment)
	.delete(authorizeRequest([Role.USER]), CommentController.deleteComment);

// Post Comments Like-Dislike Routes
// Here reactionType can be: like, dislike
router.post(
	"/:commentId/:reactionType/",
	authorizeRequest([Role.USER]),
	CommentController.createlikeDislikeComment
);
router
	.route("/:commentId/:reactionType/:userId")
	.put(authorizeRequest([Role.USER]), CommentController.editLikeDislikeComment)
	.delete(
		authorizeRequest([Role.USER]),
		CommentController.deleteLikeDislikeComment
	);

export default router;
