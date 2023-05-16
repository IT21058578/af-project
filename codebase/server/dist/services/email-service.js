import nodemailer from "nodemailer";
import { SMTP_PASS, SMTP_USER } from "../constants/constants.js";
import initializeLogger from "../utils/logger.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
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
const sendRegistrationEmail = async (email, firstName, authorizationToken) => {
    try {
        log.info("Attempting to send registration email...");
        await transporter.sendMail({
            to: email,
            subject: "Authorize your account",
            html: `Hi ${firstName}, ${authorizationToken}`,
        });
        log.info("Succesfully sent registration email");
    }
    catch (error) {
        log.error(`Couldn't send registration email ERR: ${error}`);
    }
};
const sendForgotPasswordEmail = async (email, firstName, resetToken) => {
    try {
        log.info("Attempting to send forgot password email...");
        await transporter.sendMail({
            to: email,
            subject: "Reset your assword",
            html: `Hi ${firstName}, ${resetToken}`,
        });
        log.info("Succesfully sent forgot password email");
    }
    catch (error) {
        log.error(`Couldn't send forgot password email ERR: ${error}`);
    }
};
const sendPasswordChangedEmail = async (email, firstName) => {
    try {
        log.info("Attempting to send password changed email...");
        await transporter.sendMail({
            to: email,
            subject: "Password changed",
            html: `Hi ${firstName}, We are just sending this email to notify you that your password was just changed.`,
        });
        log.info("Succesfully sent password changed email");
    }
    catch (error) {
        log.error(`Couldn't send password changed email ERR: ${error}`);
    }
};
const sendOrderConfirmationEmail = async (email, firstName) => {
    try {
        log.info("Attempting to send order confirmation email...");
        await transporter.sendMail({
            to: email,
            subject: "Password changed",
            html: `Hi ${firstName}, Your payment has been processed and the trip package details ahve been added to your account`,
        });
        log.info("Succesfully sent order confirmation email");
    }
    catch (error) {
        log.error(`Couldn't send order confirmation email ERR: ${error}`);
    }
};
export const EmailService = {
    sendRegistrationEmail,
    sendForgotPasswordEmail,
    sendPasswordChangedEmail,
    sendOrderConfirmationEmail,
};
