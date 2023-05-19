import { Schema, model } from "mongoose";
export const postAnalyticsSnapshotSchema = new Schema({
    postId: { type: String, required: true },
    likesCount: { type: [String], default: [] },
    dislikeCount: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    controverisalScore: { type: Number, default: 0 },
    hotScore: { type: Number, default: 0 },
}, { timestamps: true });
export const PostAnalyticsSnapshot = model("PostAnalyticsSnapshot", postAnalyticsSnapshotSchema);
