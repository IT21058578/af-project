import { AuthService } from "../services/auth-service.js";
import initializeLogger from "../utils/logger.js";
import { handleControllerError, } from "../utils/misc-utils.js";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { EAuthErrors } from "../constants/auth-constants.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const loginUser = async (req, res, next) => {
    try {
        log.info("Intercepted login request");
        const { email, password } = req.body;
        const user = await AuthService.loginUser(email, password);
        log.info("Succesfully processed login request");
        return res.status(200).send(user);
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [EAuthErrors.NOT_AUTHORIZED_YET],
                type: ReasonPhrases.CONFLICT,
                cause: "User exists but is not authorized yet. Please check the given email",
            },
            {
                reasons: [EAuthErrors.WRONG_PASSWORD, EAuthErrors.USER_NOT_FOUND],
                type: ReasonPhrases.UNAUTHORIZED,
                cause: "Invalid credentials",
            },
        ]);
    }
};
const logoutUser = async (req, res, next) => {
    try {
        log.info("Intercepted logout request");
        const userId = req.headers["user-id"];
        await AuthService.logoutUser(userId || "");
        log.info("Succesfully processed logout request");
        return res.status(StatusCodes.NO_CONTENT).send();
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [EAuthErrors.USER_NOT_FOUND],
                type: ReasonPhrases.UNAUTHORIZED,
                cause: "Invalid credentials",
            },
            {
                reasons: [EAuthErrors.USER_LOGGED_OUT],
                type: ReasonPhrases.CONFLICT,
                cause: "User has already logged out.",
            },
        ]);
    }
};
const registerUser = async (req, res, next) => {
    try {
        log.info("Intercepted register request");
        const { email = "", password = "", dateOfBirth = new Date(), isSubscribed = false, firstName = "", lastName = "", mobile = "", } = req.body;
        await AuthService.registerUser({
            email,
            password,
            dateOfBirth,
            isSubscribed,
            firstName,
            lastName,
            mobile,
        });
        log.info("Succesfully processed register request");
        return res.status(200).send();
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [EAuthErrors.USER_ALREADY_EXISTS],
                type: ReasonPhrases.CONFLICT,
                cause: "User with this email already exists.",
            },
        ]);
    }
};
const authorizeUser = async (req, res, next) => {
    try {
        log.info("Intercepted authorize request");
        const { email = "", authorizationToken = "" } = req.query;
        await AuthService.authorizeUser(email, authorizationToken);
        log.info("Succesfully processed authorize request");
        return res.status(200).send();
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [EAuthErrors.ALREADY_AUTHORIZED],
                type: ReasonPhrases.CONFLICT,
                cause: "User with this email has already been authorized",
            },
            {
                reasons: [EAuthErrors.USER_NOT_FOUND],
                type: ReasonPhrases.NOT_FOUND,
                cause: "User with this email was not found",
            },
        ]);
    }
};
const refreshTokens = async (req, res, next) => {
    try {
        log.info("Intercepted refreshTokens request");
        const { refreshToken } = req.body;
        const userId = req.headers["user-id"];
        const user = await AuthService.refreshTokens(userId || "", refreshToken);
        log.info("Succesfully processed refreshTokens request");
        return res.status(200).json(user);
    }
    catch (error) {
        handleControllerError(next, error, [
            {
                reasons: [EAuthErrors.USER_NOT_FOUND],
                type: ReasonPhrases.UNAUTHORIZED,
                cause: "Invalid Credentials",
            },
            {
                reasons: [EAuthErrors.USER_INVALID_TOKEN],
                type: ReasonPhrases.UNAUTHORIZED,
                cause: "User's refresh token is outdated or does not match with access token",
            },
        ]);
    }
};
const forgotPassword = async (req, res, next) => {
    try {
        log.info("Intercepted forgot password request");
        const { email } = req.body;
        await AuthService.forgotPassword(email);
        log.info("Succesfully processed forgot password request");
        return res.status(200).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const resetPassword = async (req, res, next) => {
    try {
        log.info("Intercepted reset passsword request");
        const { email, resetToken, newPassword } = req.body;
        await AuthService.resetPassword(email, resetToken, newPassword);
        log.info("Succesfully processed reset password request");
        return res.status(200).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
const changePassword = async (req, res, next) => {
    try {
        log.info("Intercepted change password request");
        const userId = req.headers["user-id"];
        const { newPassword, oldPassword } = req.body;
        await AuthService.changePassword(userId || "", newPassword, oldPassword);
        log.info("Succesfully processed change password request");
        return res.status(200).send();
    }
    catch (error) {
        handleControllerError(next, error, []);
    }
};
export const AuthController = {
    loginUser,
    logoutUser,
    authorizeUser,
    registerUser,
    refreshTokens,
    forgotPassword,
    resetPassword,
    changePassword,
};
