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

export const ELodging = {
	THREE_STAR: "THREE_STAR",
	FOUR_STAR: "FOUR_STAR",
	FIVE_STAR: "FIVE_STAR",
} as const;

export const ETransport = {
	GROUP: "GROUP",
	CAR: "CAR",
	VAN: "VAN",
} as const;

export const ELocationError = {
	LOCATION_NOT_FOUND: "Location not found",
	LOCATION_ALREADY_EXISTS: "Location already exists",
} as const;

export const ETripPackageError = {
	TRIP_PKG_NOT_FOUND: "Trip Package not found",
	TRIP_PKG_ALREADY_EXISTS: "Trip Package already exists",
} as const;

export const EPaymentErrors = {
	SESSION_URL_UNAVAILABLE: "Session URL unavailable",
	UNAUTHORIZED_WEBHOOK: "Unauthorized Webhook endpoints access",
};
