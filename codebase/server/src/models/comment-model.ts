import { Schema, Types, model } from "mongoose";

export const commentSchema = new Schema(
	{
		postId: String,
		createdById: String,
		lastUpdatedById: String,
		parentCommentId: String,
		text: String,
		likes: [String],
		dislikes: [String],
	},
	{ timestamps: true }
);

export const Comment = model("Comment", commentSchema);
