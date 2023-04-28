import { Schema, model } from "mongoose";

export const commentSchema = new Schema(
	{
		userId: String,
		text: String,
		likes: [String],
		dislikes: [String],
		isOriginalPoster: Boolean,
	},
	{ timestamps: true }
);

export const Comment = model("Comment", commentSchema);
