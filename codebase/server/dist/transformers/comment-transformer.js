import { User } from "../models/user-model.js";
import { UserTransformer } from "./user-transformer.js";
const buildCommentVO = async (comment, authorizedUserId = "") => {
    if (comment === null)
        return {};
    const users = await Promise.all([
        User.findById(comment.createdById),
        User.findById(comment.lastUpdatedById),
    ]);
    const [createdBy, lastUpdatedBy] = users.map((user) => UserTransformer.buildUserVO(user));
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
