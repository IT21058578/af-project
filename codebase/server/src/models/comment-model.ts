import { Schema, Types, model } from "mongoose";

export const commentSchema = new Schema(
	{
		postId: { type: Types.ObjectId, required: true },
		userId: { type: Types.ObjectId, required: true },
		parentId: Types.ObjectId,
		text: String,
		likes: [String],
		dislikes: [String],
		isOriginalPoster: Boolean,
	},
	{ timestamps: true }
);

export const Comment = model("Comment", commentSchema);
