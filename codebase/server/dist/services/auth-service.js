import bcrypt from "bcrypt";
import * as uuid from "uuid";
import { User } from "../models/user-model.js";
import { TokenService } from "./token-service.js";
import { EmailService } from "./email-service.js";
import { Role } from "../constants/constants.js";
import initializeLogger from "../utils/logger.js";
import { EAuthErrors } from "../constants/auth-constants.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const loginUser = async (email, password) => {
    log.info("Validating user details...");
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw new Error(EAuthErrors.USER_NOT_FOUND);
    }
    const isValidPassword = await bcrypt.compare(password, user?.password || "");
    if (!isValidPassword) {
        throw new Error(EAuthErrors.WRONG_PASSWORD);
    }
    if (!user.isAuthorized)
        throw new Error(EAuthErrors.NOT_AUTHORIZED_YET);
    const tokenFamily = {
        latestAccessToken: await TokenService.generateAccessToken(user.id, user.roles),
        latestRefreshToken: await TokenService.generateRefreshToken(user.id),
        oldAccessTokens: [],
        oldRefreshTokens: [],
    };
    log.info("Saving user details...");
    user.lastLoggedAt = new Date();
    user.tokenFamily = tokenFamily;
    await user.save();
    return {
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            id: user.id,
            roles: user.roles,
            mobile: user.mobile,
        },
        tokens: {
            accessToken: tokenFamily.latestAccessToken,
            refreshToken: tokenFamily.latestRefreshToken,
        },
    };
};
const refreshTokens = async (userId, refreshToken) => {
    log.info("Validating user details...");
    const user = await User.findById(userId).exec();
    if (!user) {
        throw Error(EAuthErrors.USER_NOT_FOUND);
    }
    const { payload: { id: refreshUserId }, } = await TokenService.decodeRefreshToken(refreshToken);
    if (refreshUserId !== userId)
        throw Error(EAuthErrors.USER_INVALID_TOKEN);
    if (user.tokenFamily?.oldRefreshTokens.includes(refreshToken))
        throw Error(EAuthErrors.USER_INVALID_TOKEN);
    const tokenFamily = {
        oldAccessTokens: [
            ...(user.tokenFamily?.oldAccessTokens || []),
            user.tokenFamily?.latestAccessToken || "",
        ],
        oldRefreshTokens: [
            ...(user.tokenFamily?.oldRefreshTokens || []),
            user.tokenFamily?.latestRefreshToken || "",
        ],
        latestAccessToken: await TokenService.generateAccessToken(user.id, user.roles),
        latestRefreshToken: await TokenService.generateRefreshToken(user.id),
    };
    log.info("Saving user details...");
    user.lastLoggedAt = new Date();
    user.tokenFamily = tokenFamily;
    await user.save();
    return {
        accessToken: tokenFamily.latestAccessToken,
        refreshToken: tokenFamily.latestRefreshToken,
    };
};
const logoutUser = async (id) => {
    const user = await User.findById(id).exec();
    if (!user)
        throw new Error(EAuthErrors.USER_NOT_FOUND);
    if (user.tokenFamily === undefined)
        throw new Error(EAuthErrors.USER_LOGGED_OUT);
    user.tokenFamily = undefined;
    await user.save();
};
const registerUser = async (user) => {
    const existingUser = await User.findOne({ email: user.email }).exec();
    if (existingUser) {
        throw new Error(EAuthErrors.USER_ALREADY_EXISTS);
    }
    const newUser = new User({ ...user });
    newUser.password = await bcrypt.hash(user.password || "", 10);
    newUser.roles = [Role.USER, Role.ADMIN];
    newUser.resetToken = uuid.v4();
    newUser.isAuthorized = false;
    newUser.authorizationToken = uuid.v4();
    newUser.createdAt = new Date();
    try {
        EmailService.sendRegistrationEmail(newUser.email || "", newUser.firstName || "", newUser.authorizationToken);
    }
    catch (error) {
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
    EmailService.sendForgotPasswordEmail(email, user.firstName || "", user.resetToken);
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
    EmailService.sendPasswordChangedEmail(user.email || "", user.firstName || "");
    await user.save();
};
const changePassword = async (userId, newPassword, oldPassword) => {
    const user = await User.findById(userId).exec();
    if (!user) {
        throw new Error("User does not exist");
    }
    const isValidPassword = await bcrypt.compare(oldPassword, user.password || "");
    if (!isValidPassword) {
        throw new Error("Password is incorrect");
    }
    EmailService.sendPasswordChangedEmail(user.email || "", user.firstName || "");
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
};
const authorizeUser = async (email, authorizationToken) => {
    const user = await User.findOne({ email }).exec();
    if (!user) {
        throw new Error("User does not exist");
    }
    if (user.authorizationToken !== authorizationToken)
        throw new Error("Authorization token is invalid");
    user.isAuthorized = true;
    await user.save();
};
export const AuthService = {
    loginUser,
    refreshTokens,
    authorizeUser,
    logoutUser,
    registerUser,
    forgotPassword,
    resetPassword,
    changePassword,
};
