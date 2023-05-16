import { CommentService } from "../services/comment-service.js";
import initializeLogger from "../utils/logger.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
	buildErrorMessage,
	handleControllerError,
} from "../utils/misc-utils.js";
import { Response, Request, NextFunction } from "express";
import { TRoleValue } from "../types/constant-types.js";
import { TComment } from "../types/model-types.js";
import { TExtendedPageOptions } from "../types/misc-types.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted getComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const { commentId } = req.params;
		const existingComment = await CommentService.getComment(commentId, userId);
		log.info("Successfully processed getComment request");
		return res.status(StatusCodes.OK).json(existingComment);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const searchComments = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted searchComments request");
		const userId = req.headers["user-id"] as string | undefined;
		const commentSearchOptions = req.query as Partial<
			TExtendedPageOptions<TComment>
		>;
		const commentPage = await CommentService.searchComments(
			commentSearchOptions as any,
			userId
		);
		log.info("Successfully processed searchComments request");
		return res.status(StatusCodes.OK).json(commentPage);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted createComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const { postId } = req.params;
		const { parentId, text } = req.body;
		const createdComment = await CommentService.createComment(
			{
				postId,
				createdById: userId,
				parentCommentId: parentId,
				text,
			},
			userId
		);
		log.info("Successfully processed createComment request");
		return res.status(StatusCodes.CREATED).json(createdComment);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const editComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted editComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const userRoles = req.headers["user-roles"] as TRoleValue[] | undefined;
		const { commentId } = req.params;
		const { text } = req.body;
		const editedComment = await CommentService.editComment(
			commentId,
			{ id: userId || "", roles: userRoles || [] },
			{
				text,
			}
		);
		log.info("Successfully processed editComment request");
		return res.status(StatusCodes.OK).json(editedComment);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const deleteComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted deleteComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const userRoles = req.headers["user-roles"] as TRoleValue[] | undefined;
		const { commentId } = req.params;
		await CommentService.deleteComment(commentId, {
			id: userId || "",
			roles: userRoles || [],
		});
		log.info("Successfully processed deleteComment request");
		return res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const createlikeDislikeComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted createlikeDislikeComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const { commentId, reactionType } = req.params;
		const editedComment = await CommentService.createlikeDislikeComment(
			commentId,
			userId || "",
			reactionType as "likes" | "dislikes"
		);
		log.info("Successfully processed createlikeDislikeComment request");
		return res.status(StatusCodes.OK).json(editedComment);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const deleteLikeDislikeComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted deleteLikeDislikeComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const { commentId, reactionType } = req.params;
		await CommentService.deleteLikeDislikeComment(
			commentId,
			userId || "",
			reactionType as "likes" | "dislikes"
		);
		log.info("Successfully processed deleteLikeDislikeComment request");
		return res.status(StatusCodes.NO_CONTENT).send();
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

export const CommentController = {
	getComment,
	createComment,
	editComment,
	deleteComment,
	searchComments,
	createlikeDislikeComment,
	deleteLikeDislikeComment,
};
