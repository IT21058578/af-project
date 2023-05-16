import { CommentService } from "../services/comment-service.js";
import initializeLogger from "../utils/logger.js";
import { StatusCodes } from "http-status-codes";
import { handleControllerError, } from "../utils/misc-utils.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const getComment = async (req, res, next) => {
    try {
        log.info("Intercepted getComment request");
        const { commentId } = req.params;
        const existingComment = await CommentService.getComment(commentId);
        log.info("Successfully processed getComment request");
        return res.send(StatusCodes.OK).json(existingComment);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const createComment = async (req, res, next) => {
    try {
        log.info("Intercepted createComment request");
        const userId = req.headers["user-id"];
        const { postId } = req.params;
        const { parentId, text } = req.body;
        const createdComment = await CommentService.createComment({
            postId,
            createdById: userId,
            parentCommentId: parentId,
            text,
        });
        log.info("Successfully processed createComment request");
        return res.send(StatusCodes.CREATED).json(createdComment);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const editComment = async (req, res, next) => {
    try {
        log.info("Intercepted editComment request");
        const userId = req.headers["user-id"];
        const userRoles = req.headers["user-roles"];
        const { commentId } = req.params;
        const { text } = req.body;
        const editedComment = await CommentService.editComment(commentId, { id: userId || "", roles: userRoles || [] }, {
            text,
        });
        log.info("Successfully processed editComment request");
        return res.send(StatusCodes.OK).json(editedComment);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const deleteComment = async (req, res, next) => {
    try {
        log.info("Intercepted deleteComment request");
        const userId = req.headers["user-id"];
        const userRoles = req.headers["user-roles"];
        const { commentId } = req.params;
        await CommentService.deleteComment(commentId, {
            id: userId || "",
            roles: userRoles || [],
        });
        log.info("Successfully processed deleteComment request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const createlikeDislikeComment = async (req, res, next) => {
    try {
        log.info("Intercepted createlikeDislikeComment request");
        const userId = req.headers["user-id"];
        const { commentId, reactionType } = req.params;
        const editedComment = await CommentService.createlikeDislikeComment(commentId, userId || "", reactionType);
        log.info("Successfully processed createlikeDislikeComment request");
        return res.status(StatusCodes.OK).json(editedComment);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const deleteLikeDislikeComment = async (req, res, next) => {
    try {
        log.info("Intercepted deleteLikeDislikeComment request");
        const userId = req.headers["user-id"];
        const { commentId, reactionType } = req.params;
        await CommentService.deleteLikeDislikeComment(commentId, userId || "", reactionType);
        log.info("Successfully processed deleteLikeDislikeComment request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
export const CommentController = {
    getComment,
    createComment,
    editComment,
    deleteComment,
    createlikeDislikeComment,
    deleteLikeDislikeComment,
};
