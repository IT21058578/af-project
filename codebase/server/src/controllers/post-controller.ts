import { PostService } from "../services/post-service";
import initializeLogger from "../utils/logger";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { buildErrorMessage } from "../utils/misc-utils";
import { NextFunction, Request, Response } from "express";
import { TRoleValue } from "../types/constant-types";

const log = initializeLogger(__filename.split("\\").pop() || "");

const getPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process getPost request");
		const { postId } = req.params;
		const existingPost = await PostService.getPost(postId);
		log.info("Successfully processed getPost request");
		return res.send(StatusCodes.OK).json(existingPost);
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

const searchPosts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process searchPosts request");
		const postSearchOptions = req.body;
		const postPage = await PostService.searchPosts(postSearchOptions);
		log.info("Successfully processed searchPosts request");
		return res.send(StatusCodes.OK).json(postPage);
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

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process createPost request");
		const userId = req.headers["user-id"];
		const data = req.body;
		const createdPost = await PostService.createPost({
			userId,
			...data,
		});
		log.info("Successfully processed createPost request");
		return res.send(StatusCodes.CREATED).json(createdPost);
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

const editPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process editPost request");
		const userId = req.headers["user-id"] as string | undefined;
		const userRoles = req.headers["user-roles"] as TRoleValue[] | undefined;
		const { postId } = req.params;
		const data = req.body;
		const editedPost = await PostService.editPost(
			postId,
			{ id: userId || "", roles: userRoles || [] },
			data
		);
		log.info("Successfully processed editPost request");
		return res.send(StatusCodes.OK).json(editedPost);
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

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Attempting to process deletePost request");
		const userId = req.headers["user-id"] as string | undefined;
		const userRoles = req.headers["user-roles"] as TRoleValue[] | undefined;
		const { postId } = req.params;
		await PostService.deletePost(postId, {
			id: userId || "",
			roles: userRoles || [],
		});
		log.info("Successfully processed deletePost request");
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

const createlikeDislikePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Attempting to process createlikeDislikePost request");
		const userId = req.headers["user-id"] as string | undefined;
		const { postId, reactionType } = req.params;
		const editedPost = await PostService.createlikeDislikePost(
			postId,
			userId || "",
			reactionType as "likes" | "dislikes"
		);
		log.info("Successfully processed createlikeDislikePost request");
		return res.status(StatusCodes.OK).json(editedPost);
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

const deleteLikeDislikePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Attempting to process deleteLikeDislikePost request");
		const userId = req.headers["user-id"] as string | undefined;
		const { postId, reactionType } = req.params;
		await PostService.deleteLikeDislikePost(
			postId,
			userId || "",
			reactionType as "likes" | "dislikes"
		);
		log.info("Successfully processed deleteLikeDislikePost request");
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

export const PostController = {
	getPost,
	createPost,
	editPost,
	deletePost,
	searchPosts,
	createlikeDislikePost,
	deleteLikeDislikePost,
};
