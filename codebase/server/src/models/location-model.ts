import { Schema, model } from "mongoose";

export const locationSchema = new Schema(
	{
		createdById: String,
		lastUpdatedById: String,
		name: String,
		imageUrl: String,
		address: {
			addressLine1: String,
			addressLine2: String,
			city: String,
			province: String,
		},
	},
	{ timestamps: true }
);

export const Location = model("Location", locationSchema);
