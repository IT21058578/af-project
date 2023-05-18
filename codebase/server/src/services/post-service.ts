import { Post } from "../models/post/post-model.js";
import { ReasonPhrases } from "http-status-codes";
import {
	buildPage,
	buildPostPaginationPipeline,
} from "../utils/mongoose-utils.js";
import {
	IAuthorizedUser,
	IPaginationResult,
	IPostPageOptions,
} from "../types/misc-types.js";
import { TPost } from "../types/model-types.js";
import { EUserError, Role } from "../constants/constants.js";
import { TPostVO, TUserVO } from "../types/vo-types.js";
import { User } from "../models/user-model.js";
import { UserService } from "./user-service.js";

const getPost = async (id: string, authorizedUserId?: string) => {
	const post = await Post.findById(id);
	if (post === null) throw Error(ReasonPhrases.NOT_FOUND);
	post.views += 1;
	post.save();
	const postVO = await buildPostVO(post.toObject(), authorizedUserId);
	return postVO;
};

const searchPosts = async (
	postSearchOptions: IPostPageOptions,
	authorizedUserId?: string
) => {
	const { data, ...rest } = (
		await Post.aggregate(buildPostPaginationPipeline(postSearchOptions as any))
	)[0] as any as IPaginationResult<TPost>;
	const postVOs = await Promise.all(
		data.map(async (post) => {
			return await buildPostVO(post, authorizedUserId);
		})
	);
	return buildPage({ data: postVOs, ...rest }, postSearchOptions);
};

const createPost = async (post: TPost, authorizedUserId: string) => {
	const newPost = new Post(post);
	newPost.createdById = authorizedUserId;
	newPost.lastUpdatedById = authorizedUserId;
	const savedPost = await newPost.save();
	const postVO = await buildPostVO(savedPost.toObject(), authorizedUserId);
	return postVO;
};

const editPost = async (
	id: string,
	authorizedUser: IAuthorizedUser,
	editedPost: Partial<TPost>
) => {
	const existingPost = await Post.findById(id);
	if (existingPost === null) throw Error(ReasonPhrases.NOT_FOUND);

	if (
		authorizedUser.id !== existingPost.createdById &&
		!authorizedUser.roles.includes(Role.ADMIN)
	) {
		throw Error(ReasonPhrases.UNAUTHORIZED);
	}

	Object.entries(editedPost).forEach(([key, value]) => {
		(existingPost as any)[key] = value ?? (existingPost as any)[key];
	});
	existingPost.lastUpdatedById = authorizedUser.id;
	const updatedPost = await existingPost.save();
	const postVO = await buildPostVO(updatedPost.toObject(), authorizedUser.id);
	return postVO;
};

// Returns whether a post was found and deleted or not
const deletePost = async (id: string, authorizedUser: IAuthorizedUser) => {
	const existingPost = await Post.findById(id);
	if (existingPost === null) throw Error(ReasonPhrases.NOT_FOUND);

	if (
		authorizedUser.id !== existingPost.createdById &&
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

	const updatedPost = await existingPost.save();
	const postVO = await buildPostVO(updatedPost.toObject(), userId);
	return postVO;
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

const buildPostVO = async (
	post: TPost,
	authorizedUserId: string = ""
): Promise<TPostVO> => {
	const [createdByUser, lastUpdatedByUser] = await Promise.all([
		User.findById(post.createdById),
		User.findById(post.lastUpdatedById),
	]);
	const createdBy = UserService.buildUserVO(createdByUser);
	const lastUpdatedBy = UserService.buildUserVO(lastUpdatedByUser);

	return {
		id: post._id,
		title: post.title,
		text: post.text,
		imageData: post.imageData,
		isFeatured: post.isFeatured,
		createdBy,
		createdAt: post.createdAt,
		lastUpdatedBy,
		updatedAt: post.updatedAt,
		tags: post.tags,
		isLiked: post.likes.includes(authorizedUserId),
		isDisliked: post.dislikes.includes(authorizedUserId),
		dislikeCount: post.dislikes.length,
		likeCount: post.likes.length,
		views: post.views,
		controverisalScore: post.controverisalScore,
		hotScore: post.hotScore,
	};
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
