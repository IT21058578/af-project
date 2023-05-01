import dotenv from "dotenv";

dotenv.config();

export const {
	SMTP_USER,
	SMTP_PASS,
	MONGODB_URI,
	PORT,
	NODE_ENV,
	TEST_DB_NAME,
	DB_NAME,
} = process.env;

export const Role = {
	USER: "USER",
	ADMIN: "ADMIN",
} as const;
