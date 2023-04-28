import dotenv from "dotenv";

dotenv.config();

export const { SMTP_USER, SMTP_PASS, MONGODB_URI, PORT } = process.env;

export const Role = {
	USER: "USER",
	ADMIN: "ADMIN",
};
