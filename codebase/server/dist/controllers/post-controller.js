import { PostService } from "../services/post-service.js";
import initializeLogger from "../utils/logger.js";
import { StatusCodes } from "http-status-codes";
import { handleControllerError, } from "../utils/misc-utils.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const getPost = async (req, res, next) => {
    try {
        log.info("Intercepted getPost request");
        const { postId } = req.params;
        const existingPost = await PostService.getPost(postId);
        log.info("Successfully processed getPost request");
        return res.send(StatusCodes.OK).json(existingPost);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const searchPosts = async (req, res, next) => {
    try {
        log.info("Intercepted searchPosts request");
        const postSearchOptions = req.query;
        const postPage = await PostService.searchPosts(postSearchOptions);
        log.info("Successfully processed searchPosts request");
        return res.send(StatusCodes.OK).json(postPage);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const createPost = async (req, res, next) => {
    try {
        log.info("Intercepted createPost request");
        const userId = req.headers["user-id"];
        const data = req.body;
        const createdPost = await PostService.createPost({
            userId,
            ...data,
        });
        log.info("Successfully processed createPost request");
        return res.send(StatusCodes.CREATED).json(createdPost);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const editPost = async (req, res, next) => {
    try {
        log.info("Intercepted editPost request");
        const userId = req.headers["user-id"];
        const userRoles = req.headers["user-roles"];
        const { postId } = req.params;
        const data = req.body;
        const editedPost = await PostService.editPost(postId, { id: userId || "", roles: userRoles || [] }, data);
        log.info("Successfully processed editPost request");
        return res.send(StatusCodes.OK).json(editedPost);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const deletePost = async (req, res, next) => {
    try {
        log.info("Intercepted deletePost request");
        const userId = req.headers["user-id"];
        const userRoles = req.headers["user-roles"];
        const { postId } = req.params;
        await PostService.deletePost(postId, {
            id: userId || "",
            roles: userRoles || [],
        });
        log.info("Successfully processed deletePost request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const createlikeDislikePost = async (req, res, next) => {
    try {
        log.info("Intercepted createlikeDislikePost request");
        const userId = req.headers["user-id"];
        const { postId, reactionType } = req.params;
        const editedPost = await PostService.createlikeDislikePost(postId, userId || "", reactionType);
        log.info("Successfully processed createlikeDislikePost request");
        return res.status(StatusCodes.OK).json(editedPost);
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const deleteLikeDislikePost = async (req, res, next) => {
    try {
        log.info("Intercepted deleteLikeDislikePost request");
        const userId = req.headers["user-id"];
        const { postId, reactionType } = req.params;
        await PostService.deleteLikeDislikePost(postId, userId || "", reactionType);
        log.info("Successfully processed deleteLikeDislikePost request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
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
