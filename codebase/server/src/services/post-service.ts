import { Post } from "../models/post-model";
import { ReasonPhrases } from "http-status-codes";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils";
import {
	IAuthorizedUser,
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types";
import { TPost } from "../types/model-types";
import { Role } from "../constants/constants";

const getPost = async (id: string) => {
	const post = await Post.findById(id).exec();
	if (post === null) throw Error(ReasonPhrases.NOT_FOUND);
	return post.toObject();
};

const searchPosts = async (
	postSearchOptions: Partial<TExtendedPageOptions<TPost>>
) => {
	const paginationResult = (await Post.aggregate(
		buildPaginationPipeline(postSearchOptions)
	).exec()) as any as IPaginationResult<TPost>;
	return buildPage(paginationResult, postSearchOptions);
};

const createPost = async (post: TPost) => {
	const newPost = new Post(post);
	return await newPost.save();
};

const editPost = async (
	id: string,
	authorizedUser: IAuthorizedUser,
	editedPost: Partial<TPost>
) => {
	const existingPost = await Post.findById(id).exec();
	if (existingPost === null) throw Error(ReasonPhrases.NOT_FOUND);

	if (
		authorizedUser.id !== existingPost.userId &&
		!authorizedUser.roles.includes(Role.ADMIN)
	) {
		throw Error(ReasonPhrases.UNAUTHORIZED);
	}

	// TODO: Add updating logic
	return (await existingPost.save()).toObject();
};

// Returns whether a post was found and deleted or not
const deletePost = async (id: string, authorizedUser: IAuthorizedUser) => {
	const existingPost = await Post.findById(id);
	if (existingPost === null) throw Error(ReasonPhrases.NOT_FOUND);

	if (
		authorizedUser.id !== existingPost.userId &&
		!authorizedUser.roles.includes(Role.ADMIN)
	) {
		throw Error(ReasonPhrases.UNAUTHORIZED);
	}

	await existingPost.deleteOne();
};

// Switch between like and dislike
const createlikeDislikePost = async (
	postId: string,
	userId: string,
	reactionType: "likes" | "dislikes"
) => {
	const existingPost = await Post.findById(postId);
	if (existingPost === null) throw Error(ReasonPhrases.NOT_FOUND);
	const oppositeReactionType = reactionType === "likes" ? "dislikes" : "likes";

	if (existingPost[reactionType].includes(userId)) {
		// Ignore
	} else if (existingPost[oppositeReactionType].includes(userId)) {
		existingPost[oppositeReactionType] = existingPost[
			oppositeReactionType
		].filter((item) => item !== userId);
		existingPost[reactionType].push(userId);
	} else {
		existingPost[reactionType].push(userId);
	}

	return (await existingPost.save()).toObject();
};

const deleteLikeDislikePost = async (
	postId: string,
	userId: string,
	reactionType: "likes" | "dislikes"
) => {
	const existingPost = await Post.findById(postId);
	if (existingPost === null) throw Error(ReasonPhrases.NOT_FOUND);
	if (!existingPost[reactionType].includes(userId))
		throw Error(ReasonPhrases.NOT_FOUND);
	existingPost[reactionType] = existingPost[reactionType].filter(
		(item) => item !== userId
	);
	await existingPost.save();
};

export const PostService = {
	getPost,
	searchPosts,
	createPost,
	editPost,
	deletePost,
	createlikeDislikePost,
	deleteLikeDislikePost,
};
