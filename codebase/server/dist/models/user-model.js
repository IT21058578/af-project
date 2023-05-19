import { Schema, model } from "mongoose";
import { tokenFamilySchema } from "./token-family-model.js";
export const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    isAuthorized: { type: Boolean, default: false },
    isSubscribed: { type: Boolean, default: true },
    resetToken: String,
    authorizationToken: String,
    lastLoggedAt: Date,
    roles: { type: [String], default: [] },
    tokenFamily: tokenFamilySchema,
}, { timestamps: true });
export const User = model("User", userSchema);
