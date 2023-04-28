import { Schema, model } from "mongoose";
import { commentSchema } from "./comment-model";

export const commentThreadSchema = new Schema(
	{
		rootComment: commentSchema,
		replies: [commentSchema],
	},
	{ timestamps: true }
);

export const CommentThread = model("CommentThread", commentThreadSchema);
