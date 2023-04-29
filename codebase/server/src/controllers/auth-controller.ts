import { Request, Response } from "express";
import { AuthService } from "../services/auth-service";
import initializeLogger from "../utils/logger";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const loginUser = async (req: Request, res: Response) => {
	try {
		log.info("Intercepted login request");
		const { email, password } = req.body;
		const user = await AuthService.loginUser(email, password);
		log.info("Succesfully processed login request");
		return res.status(200).send(user);
	} catch (error) {
		log.error(`Error occurred when processing login request\n\t${error}`);
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const logoutUser = async (req: Request, res: Response) => {
	try {
		log.info("Intercepted logout request");
		const { email } = req.body;
		await AuthService.logoutUser(email);
		log.info("Succesfully processed logout request");
		return res.status(200).send();
	} catch (error) {
		log.error(`Error occurred when processing logout request\n\t${error}`);
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const registerUser = async (req: Request, res: Response) => {
	try {
		log.info("Intercepted register request");
		const {
			email,
			password,
			dateOfBirth,
			isSubscribed,
			firstName,
			lastName,
			mobile,
		} = req.body;
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
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const forgotPassword = async (req: Request, res: Response) => {
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
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const resetPassword = async (req: Request, res: Response) => {
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
		if (false) {
		} else {
			return res.status(500).send();
		}
	}
};

const changePassword = async (req: Request, res: Response) => {
	try {
		log.info("Intercepted change password request");
		const { email, newPassword, oldPassword } = req.body;
		await AuthService.changePassword(email, newPassword, oldPassword);
		log.info("Succesfully processed change password request");
		return res.status(200).send();
	} catch (error) {
		log.error(
			`Error occurred when processing change password request\n\t${error}`
		);
		if (false) {
		} else {
			return res.status(500).send();
		}
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
