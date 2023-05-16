import { Comment } from "../models/comment-model.js";
import { Post } from "../models/post/post-model.js";
import { ReasonPhrases } from "http-status-codes";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import { TComment } from "../types/model-types.js";
import {
	IAuthorizedUser,
	IPaginationResult,
	TExtendedPageOptions,
} from "../types/misc-types.js";
import { EUserError, Role } from "../constants/constants.js";
import { TCommentVO, TUserVO } from "../types/vo-types.js";
import { User } from "../models/user-model.js";

const getComment = async (id: string) => {
	const comment = await Comment.findById(id).exec();
	if (comment === null) throw Error(ReasonPhrases.NOT_FOUND);
	return comment.toObject();
};

const searchComments = async (
	commentSearchOptions: TExtendedPageOptions<TComment>
) => {
	const paginationResult = (
		await Comment.aggregate(
			buildPaginationPipeline(commentSearchOptions)
		).exec()
	)[0] as any as IPaginationResult<TComment>;
	return buildPage(paginationResult, commentSearchOptions);
};

const createComment = async (comment: Partial<TComment>) => {
	const newComment = new Comment(comment);
	return await newComment.save();
};

const editComment = async (
	id: string,
	authorizedUser: IAuthorizedUser,
	editedComment: Partial<TComment>
) => {
	const existingComment = await Comment.findById(id).exec();
	if (existingComment === null) throw Error(ReasonPhrases.NOT_FOUND);

	if (
		authorizedUser.id !== existingComment.createdById &&
		!authorizedUser.roles.includes(Role.ADMIN)
	) {
		throw Error(ReasonPhrases.UNAUTHORIZED);
	}

	existingComment.text = editedComment.text || existingComment.text;
	return (await existingComment.save()).toObject();
};

const deleteComment = async (id: string, authorizedUser: IAuthorizedUser) => {
	const existingComment = await Comment.findById(id);
	if (existingComment === null) throw Error(ReasonPhrases.NOT_FOUND);

	if (
		authorizedUser.id !== existingComment.createdById &&
		!authorizedUser.roles.includes("ADMIN")
	) {
		throw Error(ReasonPhrases.UNAUTHORIZED);
	}

	await existingComment.deleteOne();
};

const createlikeDislikeComment = async (
	id: string,
	userId: string,
	reactionType: "likes" | "dislikes"
) => {
	const existingComment = await Comment.findById(id);
	if (existingComment === null) throw Error(ReasonPhrases.NOT_FOUND);
	const oppositeReactionType = reactionType === "likes" ? "dislikes" : "likes";

	if (existingComment[reactionType].includes(userId)) {
		// Ignore
	} else if (existingComment[oppositeReactionType].includes(userId)) {
		existingComment[oppositeReactionType] = existingComment[
			oppositeReactionType
		].filter((item) => item !== userId);
		existingComment[reactionType].push(userId);
	} else {
		existingComment[reactionType].push(userId);
	}

	return (await existingComment.save()).toObject();
};

const deleteLikeDislikeComment = async (
	id: string,
	userId: string,
	reactionType: "likes" | "dislikes"
) => {
	const existingComment = await Post.findById(id);
	if (existingComment === null) throw Error(ReasonPhrases.NOT_FOUND);
	if (!existingComment[reactionType].includes(userId))
		throw Error(ReasonPhrases.NOT_FOUND);
	existingComment[reactionType] = existingComment[reactionType].filter(
		(item) => item !== userId
	);
	await existingComment.save();
};

const buildCommentVO = async (
	comment: TComment,
	authorizedUserId: string = ""
): Promise<TCommentVO> => {
	const users = await Promise.all([
		User.findById(comment.createdById),
		User.findById(comment.lastUpdatedById),
	]);

	let createdBy: TUserVO, lastUpdatedBy: TUserVO;
	if (users.every((item) => item !== null)) {
		[createdBy, lastUpdatedBy] = users as TUserVO[];
	} else {
		throw Error(EUserError.NOT_FOUND);
	}

	return {
		id: comment._id,
		postId: comment.postId,
		parentCommentId: comment.parentCommentId,
		text: comment.text,
		createdBy,
		createdAt: comment.createdAt,
		lastUpdatedBy,
		updatedAt: comment.updatedAt,
		dislikeCount: comment.dislikes.length,
		likeCount: comment.likes.length,
		isLiked: comment.likes.includes(authorizedUserId),
		isDisliked: comment.likes.includes(authorizedUserId),
	};
};

export const CommentService = {
	getComment,
	searchComments,
	createComment,
	editComment,
	deleteComment,
	deleteLikeDislikeComment,
	createlikeDislikeComment,
};
