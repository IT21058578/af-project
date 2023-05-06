import { Schema, Types, model } from "mongoose";

export const postSchema = new Schema(
	{
		createdById: String,
		lastUpdatedById: String,
		title: String,
		text: String,
		imageData: String,
		tags: [String],
		likes: [String],
		dislikes: [String],
		views: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Post = model("Post", postSchema);
