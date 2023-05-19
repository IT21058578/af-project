import { Schema, Types, model } from "mongoose";

export const packageAnalyticsSnapshotSchema = new Schema(
	{
		packageId: { type: String, required: true },
		totalBookingCount: { type: Number, default: 0 },
		specificBookingCount: {
			persons: {
				type: Map,
				of: Number,
			},
			transport: {
				group: Number,
				van: Number,
				car: Number,
			},
			lodging: {
				threeStar: Number,
				fourStar: Number,
				fiveStar: Number,
			},
			perPersonFood: Number,
		},
		views: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const PackageAnalyticsSnapshot = model(
	"PackageAnalyticsSnapshot",
	packageAnalyticsSnapshotSchema
);
