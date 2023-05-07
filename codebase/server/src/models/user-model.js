import { Schema, model } from "mongoose";

const tokenFamilySchema = new Schema({
	latestAccessToken: String,
	latestRefreshToken: String,
	oldAccessTokens: [String],
	oldRefreshTokens: [String],
});

const userSchema = new Schema({
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
	tokenFamily: tokenFamilySchema,
});

const User = model("User", userSchema);
const TokenFamily = model("TokenFamily", tokenFamilySchema);
