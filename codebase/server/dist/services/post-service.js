import { Post } from "../models/post/post-model.js";
import {
	PageUtils,
	buildPostPaginationPipeline,
} from "../utils/mongoose-utils.js";
import { EPostError, EUserError, Role } from "../constants/constants.js";
import { PostTransformer } from "../transformers/post-transformer.js";
const getPost = async (id, authorizedUserId) => {
	const post = await Post.findById(id);
	if (post === null) throw Error(EPostError.NOT_FOUND);
	post.views += 1;
	post.save();
	const postVO = await PostTransformer.buildPostVO(
		post.toObject(),
		authorizedUserId
	);
	return postVO;
};
const searchPosts = async (postSearchOptions, authorizedUserId) => {
	const { data, ...rest } = (
		await Post.aggregate(buildPostPaginationPipeline(postSearchOptions))
	)[0];
	const postVOs = await Promise.all(
		data.map(async (post) => {
			return await PostTransformer.buildPostVO(post, authorizedUserId);
		})
	);
	return PageUtils.buildPage({ data: postVOs, ...rest }, postSearchOptions);
};
const createPost = async (post, authorizedUserId) => {
	post.createdById = authorizedUserId;
	post.lastUpdatedById = authorizedUserId;
	const savedPost = await Post.create(post);
	const postVO = await PostTransformer.buildPostVO(
		savedPost.toObject(),
		authorizedUserId
	);
	return postVO;
};
const editPost = async (id, authorizedUser, editedPost) => {
	const existingPost = await Post.findById(id);
	if (existingPost === null) throw Error(EPostError.NOT_FOUND);
	if (
		authorizedUser.id !== existingPost.createdById &&
		!authorizedUser.roles.includes(Role.ADMIN)
	) {
		throw Error(EUserError.UNAUTHORIZED);
	}
	Object.entries(editedPost).forEach(([key, value]) => {
		existingPost[key] = value ?? existingPost[key];
	});
	existingPost.lastUpdatedById = authorizedUser.id;
	const updatedPost = await existingPost.save();
	const postVO = await PostTransformer.buildPostVO(
		updatedPost.toObject(),
		authorizedUser.id
	);
	return postVO;
};
// Returns whether a post was found and deleted or not
const deletePost = async (id, authorizedUser) => {
	const existingPost = await Post.findById(id);
	if (existingPost === null) throw Error(EPostError.NOT_FOUND);
	if (
		authorizedUser.id !== existingPost.createdById &&
		!authorizedUser.roles.includes(Role.ADMIN)
	) {
		throw Error(EUserError.UNAUTHORIZED);
	}
	await existingPost.deleteOne();
};
// Switch between like and dislike
const createlikeDislikePost = async (postId, userId, reactionType) => {
	const existingPost = await Post.findById(postId);
	if (existingPost === null) throw Error(EPostError.NOT_FOUND);
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
	const updatedPost = await existingPost.save();
	const postVO = await PostTransformer.buildPostVO(
		updatedPost.toObject(),
		userId
	);
	return postVO;
};
const deleteLikeDislikePost = async (postId, userId, reactionType) => {
	const existingPost = await Post.findById(postId);
	if (existingPost === null) throw Error(EPostError.NOT_FOUND);
	if (!existingPost[reactionType].includes(userId))
		throw Error(EPostError.NOT_FOUND);
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
