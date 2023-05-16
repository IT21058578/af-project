import { PostService } from "../services/post-service.js";
import initializeLogger from "../utils/logger.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import {
	buildErrorMessage,
	handleControllerError,
} from "../utils/misc-utils.js";
import { NextFunction, Request, Response } from "express";
import { TRoleValue } from "../types/constant-types.js";
import { TExtendedPageOptions } from "../types/misc-types.js";
import { TPost } from "../types/model-types.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const getPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted getPost request");
		const { postId } = req.params;
		const userId = req.headers["user-id"] as string;
		const existingPost = await PostService.getPost(postId, userId);
		log.info("Successfully processed getPost request");
		return res.status(StatusCodes.OK).json(existingPost);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const searchPosts = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted searchPosts request");
		const userId = req.headers["user-id"] as string;
		const postSearchOptions = req.query as Partial<TExtendedPageOptions<TPost>>;
		const postPage = await PostService.searchPosts(postSearchOptions as any, userId);
		log.info("Successfully processed searchPosts request");
		return res.status(StatusCodes.OK).json(postPage);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted createPost request");
		const userId = req.headers["user-id"] as string;
		const data = req.body;
		const createdPost = await PostService.createPost(
			{
				userId,
				...data,
			},
			userId
		);
		log.info("Successfully processed createPost request");
		return res.status(StatusCodes.CREATED).json(createdPost);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const editPost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted editPost request");
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
		return res.status(StatusCodes.OK).json(editedPost);
	} catch (error) {
		handleControllerError(next, error, []);
	}
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted deletePost request");
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
		handleControllerError(next, error, []);
	}
};

const createlikeDislikePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted createlikeDislikePost request");
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
		handleControllerError(next, error, []);
	}
};

const deleteLikeDislikePost = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted deleteLikeDislikePost request");
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
		handleControllerError(next, error, []);
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
