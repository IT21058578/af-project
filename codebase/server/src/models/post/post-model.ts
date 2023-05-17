import { Schema, Types, model } from "mongoose";

export const postSchema = new Schema(
	{
		createdById: { type: String, required: true },
		lastUpdatedById: String,

		title: { type: String, required: true },
		text: { type: String, required: true },
		imageData: String,
		tags: { type: [String], default: [] },
		likes: { type: [String], default: [] },
		dislikes: { type: [String], default: [] },
		views: { type: Number, default: 0 },
		controverisalScore: { type: Number, default: 0 },
		hotScore: { type: Number, default: 0 },
		isFeatured: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Post = model("Post", postSchema);
