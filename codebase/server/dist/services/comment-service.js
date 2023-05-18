import { Comment } from "../models/comment-model.js";
import { ReasonPhrases } from "http-status-codes";
import { buildPage, buildPaginationPipeline } from "../utils/mongoose-utils.js";
import { Role } from "../constants/constants.js";
import { CommentTransformer } from "../transformers/comment-transformer.js";
const getComment = async (id, authorizedUserId) => {
    const comment = await Comment.findById(id);
    if (comment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    return await CommentTransformer.buildCommentVO(comment.toObject(), authorizedUserId);
};
const searchComments = async (commentSearchOptions, authorizedUserId) => {
    const { data, ...rest } = (await Comment.aggregate(buildPaginationPipeline(commentSearchOptions)))[0];
    const commentVOs = await Promise.all(data.map(async (comment) => {
        return await CommentTransformer.buildCommentVO(comment, authorizedUserId);
    }));
    return buildPage({ data: commentVOs, ...rest }, commentSearchOptions);
};
const createComment = async (comment, authorizedUserId) => {
    const newComment = new Comment(comment);
    const savedComment = await newComment.save();
    return await CommentTransformer.buildCommentVO(savedComment.toObject(), authorizedUserId);
};
const editComment = async (id, authorizedUser, editedComment) => {
    const existingComment = await Comment.findById(id);
    if (existingComment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    if (authorizedUser.id !== existingComment.createdById &&
        !authorizedUser.roles.includes(Role.ADMIN)) {
        throw Error(ReasonPhrases.UNAUTHORIZED);
    }
    existingComment.text = editedComment.text || existingComment.text;
    return CommentTransformer.buildCommentVO((await existingComment.save()).toObject());
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
    return CommentTransformer.buildCommentVO((await existingComment.save()).toObject(), userId);
};
const deleteLikeDislikeComment = async (id, userId, reactionType) => {
    const existingComment = await Comment.findById(id);
    if (existingComment === null)
        throw Error(ReasonPhrases.NOT_FOUND);
    if (!existingComment[reactionType].includes(userId))
        throw Error(ReasonPhrases.NOT_FOUND);
    existingComment[reactionType] = existingComment[reactionType].filter((item) => item !== userId);
    await existingComment.save();
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
