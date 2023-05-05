import { Schema, model } from "mongoose";

export const tripPackageSchema = new Schema(
	{
		createdBy: String,
		lastUpdatedBy: String,
		name: String,
		price: Number,
		discount: {
			type: { type: String, enum: ["FLAT", "PERCENT"] },
			value: Number,
		},
		plan: [
			{
				location: String,
				stayTime: String,
				nextRoute: String,
				travelTime: String,
			},
		],
		limitedDateRange: {
			startDate: Date,
			endDate: Date,
		},
		views: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const TripPackage = model("TripPackage", tripPackageSchema);
