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
import { UserTransformer } from "./user-transformer.js";

const buildCommentVO = async (
	comment: TComment,
	authorizedUserId: string = ""
): Promise<TCommentVO> => {
	const users = await Promise.all([
		User.findById(comment.createdById),
		User.findById(comment.lastUpdatedById),
	]);

	const [createdBy, lastUpdatedBy] = users.map((user) =>
		UserTransformer.buildUserVO(user)
	);

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
		isDisliked: comment.dislikes.includes(authorizedUserId),
	};
};

export const CommentTransformer = {
	buildCommentVO,
};
