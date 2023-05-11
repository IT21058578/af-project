import { Schema, Types, model } from "mongoose";
import { ELodging, ETransport } from "../constants/constants.js";

export const bookingSchema = new Schema(
	{
		createdById: String,
		stripeSessionId: String,
		stripePaymentId: String,
		paymentMadeAt: Date,
		package: {
			id: String,
			lodging: { type: String, enum: Object.values(ELodging) },
			transport: { type: String, enum: Object.values(ETransport) },
			perFood: Boolean,
		},
	},
	{ timestamps: true }
);

export const Booking = model("Booking", bookingSchema);