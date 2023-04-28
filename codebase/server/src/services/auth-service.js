import bcrypt from "bcrypt";
import * as uuid from "uuid";

import { User } from "../models/user-model.js";
import { TokenService } from "../services/token-service.js";
import { EmailService } from "../services/email-service.js";
import { Role } from "../constants/constants.js";
import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const loginUser = async (email, password) => {
	log.info("Validating user details...");
	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new Error("User does not exist");
	}

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		throw new Error("Password is incorrect");
	}

	const tokenFamily = {
		latestAccessToken: TokenService.generateAccessToken(),
		latestRefreshToken: TokenService.generateRefreshToken(),
		oldAccessTokens: [],
		oldRefreshTokens: [],
	};

	log.info("Saving user details...");
	user.lastLoggedAt = new Date();
	user.tokenFamily = tokenFamily;
	await user.save();

	return {
		user,
		tokens: {
			accessToken: tokenFamily.latestAccessToken,
			refreshToken: tokenFamily.latestRefreshToken,
		},
	};
};

const refreshUser = async (refreshToken) => {};

const logoutUser = async (email) => {
	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new Error("User does not exist");
	}

	user.tokenFamily = undefined;
	await user.save();
};

const registerUser = async (user) => {
	const existingUser = await User.findOne({ email: user.email }).exec();
	if (existingUser) {
		throw new Error("User already exists");
	}

	const newUser = new User({ ...user });
	newUser.password = await bcrypt.hash(user.password, 10);
	newUser.roles = [Role.USER, Role.ADMIN];
	newUser.resetToken = uuid.v4();
	newUser.isAuthorized = false;
	newUser.authorizationToken = uuid.v4();
	newUser.createdAt = new Date();

	try {
		EmailService.sendRegistrationEmail(
			newUser.email,
			newUser.firstName,
			newUser.authorizationToken
		);
	} catch (error) {
		log.error("Failed to send registration email");
	}

	await newUser.save();
};

const forgotPassword = async (email) => {
	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new Error("User does not exist");
	}

	user.resetToken = uuid.v4();

	try {
		EmailService.sendForgotPasswordEmail(
			email,
			user.firstName,
			user.resetToken
		);
	} catch (error) {
		log.error("Failed to send registration email");
	}

	await user.save();
};

const resetPassword = async (email, resetToken, newPassword) => {
	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new Error("User does not exist");
	}

	if (user.resetToken !== resetToken) {
		throw new Error("Invalid token");
	}

	user.password = await bcrypt.hash(newPassword, 10);
	user.resetToken = uuid.v4();

	try {
		EmailService.sendPasswordChangedEmail(user.email, user.firstName);
	} catch (error) {
		log.error("Failed to send registration email");
	}

	await user.save();
};

const changePassword = async (email, newPassword, oldPassword) => {
	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new Error("User does not exist");
	}

	const isValidPassword = await bcrypt.compare(oldPassword, user.password);
	if (!isValidPassword) {
		throw new Error("Password is incorrect");
	}

	try {
		EmailService.sendPasswordChangedEmail(user.email, user.firstName);
	} catch (error) {
		log.error("Failed to send registration email");
	}

	user.password = bcrypt.hash(newPassword, 10);
	await user.save();
};

export const AuthService = {
	loginUser,
	refreshUser,
	logoutUser,
	registerUser,
	forgotPassword,
	resetPassword,
	changePassword,
};
