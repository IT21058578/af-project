import { CommentService } from "../services/comment-service.js";
import initializeLogger from "../utils/logger.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { buildErrorMessage } from "../utils/misc-utils.js";
import { Response, Request, NextFunction } from "express";
import { TRoleValue } from "../types/constant-types.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process getComment request");
		const { commentId } = req.params;
		const existingComment = await CommentService.getComment(commentId);
		log.info("Successfully processed getComment request");
		return res.send(StatusCodes.OK).json(existingComment);
	} catch (error) {
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const createComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Attempting to process createComment request");
		const userId = req.headers["user-id"] as string | undefined;
		const { postId } = req.params;
		const { parentId, text } = req.body;
		const createdComment = await CommentService.createComment({
			postId,
			userId,
			parentId,
			text,
		});
		log.info("Successfully processed createComment request");
		return res.send(StatusCodes.CREATED).json(createdComment);
	} catch (error) {
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const editComment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process editComment request");
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
		return res.send(StatusCodes.OK).json(editedComment);
	} catch (error) {
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const deleteComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Attempting to process deleteComment request");
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
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const createlikeDislikeComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Attempting to process createlikeDislikeComment request");
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
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const deleteLikeDislikeComment = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Attempting to process deleteLikeDislikeComment request");
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
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
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
