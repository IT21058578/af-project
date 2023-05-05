import { Schema, model } from "mongoose";

export const locationSchema = new Schema(
	{
		createdBy: String,
		lastUpdatedBy: String,
		name: String,
		imageUrl: String,
		price: {
			base: Number,
			personDay: Number,
		},
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
