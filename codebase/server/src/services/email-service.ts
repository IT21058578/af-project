import nodemailer from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "../constants/constants";
import initializeLogger from "../utils/logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const transporter = nodemailer.createTransport({
	service: "gmail",
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: SMTP_USER,
		pass: SMTP_PASS,
	},
});

const sendRegistrationEmail = async (
	email: string,
	firstName: string,
	authorizationToken: string
) => {
	log.info("Attempting to send registration email...");
	await transporter.sendMail({
		to: email,
		subject: "Authorize your account",
		html: `Hi ${firstName}, ${authorizationToken}`,
	});
	log.info("Succesfully sent registration email");
};

const sendForgotPasswordEmail = async (
	email: string,
	firstName: string,
	resetToken: string
) => {
	log.info("Attempting to send forgot password email...");
	await transporter.sendMail({
		to: email,
		subject: "Reset your assword",
		html: `Hi ${firstName}, ${resetToken}`,
	});
	log.info("Succesfully sent forgot password email");
};

const sendPasswordChangedEmail = async (email: string, firstName: string) => {
	log.info("Attempting to send password changed email...");
	await transporter.sendMail({
		to: email,
		subject: "Password changed",
		html: `Hi ${firstName}, We are just sending this email to notify you that your password was just changed.`,
	});
	log.info("Succesfully sent password changed email");
};

export const EmailService = {
	sendRegistrationEmail,
	sendForgotPasswordEmail,
	sendPasswordChangedEmail,
};
