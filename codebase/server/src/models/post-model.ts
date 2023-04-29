import { Schema, Types, model } from "mongoose";

export const postSchema = new Schema(
	{
		userId: Types.ObjectId,
		title: String,
		text: String,
		image: String,
		tags: [String],
		likes: [String],
		dislikes: [String],
	},
	{ timestamps: true }
);

export const Post = model("Post", postSchema);
