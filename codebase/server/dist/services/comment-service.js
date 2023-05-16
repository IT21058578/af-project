import { Comment } from "../models/comment-model.js";
import { Post } from "../models/post/post-model.js";
import { ReasonPhrases } from "http-status-codes";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import { EUserError, Role } from "../constants/constants.js";
import { User } from "../models/user-model.js";
const getComment = async (id) => {
    const comment = await Comment.findById(id).exec();
    if (comment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    return comment.toObject();
};
const searchComments = async (commentSearchOptions) => {
    const paginationResult = (await Comment.aggregate(buildPaginationPipeline(commentSearchOptions)).exec())[0];
    return buildPage(paginationResult, commentSearchOptions);
};
const createComment = async (comment) => {
    const newComment = new Comment(comment);
    return await newComment.save();
};
const editComment = async (id, authorizedUser, editedComment) => {
    const existingComment = await Comment.findById(id).exec();
    if (existingComment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    if (authorizedUser.id !== existingComment.createdById &&
        !authorizedUser.roles.includes(Role.ADMIN)) {
        throw Error(ReasonPhrases.UNAUTHORIZED);
    }
    existingComment.text = editedComment.text || existingComment.text;
    return (await existingComment.save()).toObject();
};
const deleteComment = async (id, authorizedUser) => {
    const existingComment = await Comment.findById(id);
    if (existingComment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    if (authorizedUser.id !== existingComment.createdById &&
        !authorizedUser.roles.includes("ADMIN")) {
        throw Error(ReasonPhrases.UNAUTHORIZED);
    }
    await existingComment.deleteOne();
};
const createlikeDislikeComment = async (id, userId, reactionType) => {
    const existingComment = await Comment.findById(id);
    if (existingComment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    const oppositeReactionType = reactionType === "likes" ? "dislikes" : "likes";
    if (existingComment[reactionType].includes(userId)) {
        // Ignore
    }
    else if (existingComment[oppositeReactionType].includes(userId)) {
        existingComment[oppositeReactionType] = existingComment[oppositeReactionType].filter((item) => item !== userId);
        existingComment[reactionType].push(userId);
    }
    else {
        existingComment[reactionType].push(userId);
    }
    return (await existingComment.save()).toObject();
};
const deleteLikeDislikeComment = async (id, userId, reactionType) => {
    const existingComment = await Post.findById(id);
    if (existingComment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    if (!existingComment[reactionType].includes(userId))
        throw Error(ReasonPhrases.NOT_FOUND);
    existingComment[reactionType] = existingComment[reactionType].filter((item) => item !== userId);
    await existingComment.save();
};
const buildCommentVO = async (comment, authorizedUserId = "") => {
    const users = await Promise.all([
        User.findById(comment.createdById),
        User.findById(comment.lastUpdatedById),
    ]);
    let createdBy, lastUpdatedBy;
    if (users.every((item) => item !== null)) {
        [createdBy, lastUpdatedBy] = users;
    }
    else {
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
