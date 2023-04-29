import { Schema, model } from "mongoose";
import { tokenFamilySchema } from "./token-family-model";

export const userSchema = new Schema({
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
	createdAt: Date,
	lastLoggedAt: Date,
	roles: [String],
	tokenFamily: tokenFamilySchema,
});

export const User = model("User", userSchema);
