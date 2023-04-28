import { Schema, model } from "mongoose";
import { commentThreadSchema } from "./comment-thread-model";

export const postSchema = new Schema(
	{
		title: String,
		text: String,
		image: String,
		tags: [String],
		likes: [String],
		dislikes: [String],
		commentThreads: [commentThreadSchema],
	},
	{ timestamps: true }
);

export const Post = model("Post", postSchema);
