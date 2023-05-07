import { Schema, Types, model } from "mongoose";

export const commentSchema = new Schema(
	{
		postId: String,
		userId: String,
		parentId: String,
		text: String,
		likes: [String],
		dislikes: [String],
		isOriginalPoster: Boolean,
	},
	{ timestamps: true }
);

export const Comment = model("Comment", commentSchema);
