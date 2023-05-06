import { Schema, model } from "mongoose";
import { tokenFamilySchema } from "./token-family-model.js";

export const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		mobile: String,
		email: String,
		password: String,
		dateOfBirth: Date,
		isAuthorized: Boolean,
		isSubscribed: Boolean,
		resetToken: String,
		authorizationToken: String,
		lastLoggedAt: Date,
		roles: [String],
		tokenFamily: tokenFamilySchema,
	},
	{ timestamps: true }
);

export const User = model("User", userSchema);