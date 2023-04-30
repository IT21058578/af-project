import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import initializeLogger from "../utils/logger";
import { TUser } from "../types/model-types";
import { buildErrorMessage } from "../utils/misc-utils";
import { ReasonPhrases } from "http-status-codes";

const log = initializeLogger(__filename.split("\\").pop() || "");

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted login request");
		const { email, password } = req.body;
		const user = await AuthService.loginUser(email, password);
		log.info("Succesfully processed login request");
		return res.status(200).send(user);
	} catch (error) {
		log.error(`Error occurred when processing login request\n\t${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		log.info("Intercepted logout request");
		const userId = req.headers["user-id"] as string | undefined;
		await AuthService.logoutUser(userId || "");
		log.info("Succesfully processed logout request");
		return res.status(200).send();
	} catch (error) {
		log.error(`An error occurred: ${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted register request");
		const {
			email = "",
			password = "",
			dateOfBirth = new Date(),
			isSubscribed = false,
			firstName = "",
			lastName = "",
			mobile = "",
		}: Partial<TUser> = req.body;
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
	} catch (error) {
		log.error(`Error occurred when processing register request\n\t${error}`);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const forgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted forgot password request");
		const { email } = req.body;
		await AuthService.forgotPassword(email);
		log.info("Succesfully processed forgot password request");
		return res.status(200).send();
	} catch (error) {
		log.error(
			`Error occurred when processing forgot passowrd request\n\t${error}`
		);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted reset passsword request");
		const { email, resetToken, password } = req.body;
		await AuthService.resetPassword(email, resetToken, password);
		log.info("Succesfully processed reset password request");
		return res.status(200).send();
	} catch (error) {
		log.error(
			`Error occurred when processing reset password request\n\t${error}`
		);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

const changePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		log.info("Intercepted change password request");
		const userId = req.headers["user-id"] as string | undefined;
		const { newPassword, oldPassword } = req.body;
		await AuthService.changePassword(userId || "", newPassword, oldPassword);
		log.info("Succesfully processed change password request");
		return res.status(200).send();
	} catch (error) {
		log.error(
			`Error occurred when processing change password request\n\t${error}`
		);
		next(
			buildErrorMessage(
				ReasonPhrases.INTERNAL_SERVER_ERROR,
				"An unknown error occurred while trying to process your request",
				"CONTROLLER_SERVICE",
				error
			)
		);
	}
};

export const AuthController = {
	loginUser,
	logoutUser,
	registerUser,
	forgotPassword,
	resetPassword,
	changePassword,
};
