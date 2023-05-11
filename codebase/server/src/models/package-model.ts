import { Schema, model } from "mongoose";

export const tripPackageSchema = new Schema(
	{
		name: String,
		description: String,
		createdById: String,
		lastUpdatedById: String,
		totalDistance: Number,
		price: {
			perPerson: Number,
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
		discount: {
			type: { type: String, enum: ["FLAT", "PERCENT"] },
			value: Number,
		},
		plan: [
			{
				locationId: String,
				activities: [String],				
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
