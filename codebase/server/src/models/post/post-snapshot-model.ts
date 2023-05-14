import { Schema, Types, model } from "mongoose";

export const postSchema = new Schema(
	{
		likes: { type: [String], default: [] },
		dislikes: { type: [String], default: [] },
		views: { type: Number, default: 0 },
		controverisalScore: { type: Number, default: 0 },
		hotScore: { type: Number, default: 0 },
		isFeatured: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const PostAnalyticsSnapshot = model("PostAnalyticsSnapshot", postSchema);
