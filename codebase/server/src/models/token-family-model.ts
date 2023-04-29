import { Schema, model } from "mongoose";

export const tokenFamilySchema = new Schema({
	latestAccessToken: String,
	latestRefreshToken: String,
	oldAccessTokens: [String],
	oldRefreshTokens: [String],
});

export const TokenFamily = model("TokenFamily", tokenFamilySchema);