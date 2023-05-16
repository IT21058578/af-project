import { Schema, Types, model } from "mongoose";

export const commentSchema = new Schema(
	{
		postId: { type: String, required: true },
		createdById: { type: String, required: true },
		lastUpdatedById: String,
		parentCommentId: String,
		text: { type: String, required: true },
		likes: { type: [String], default: [] },
		dislikes: { type: [String], default: [] },
	},
	{ timestamps: true }
);

export const Comment = model("Comment", commentSchema);
