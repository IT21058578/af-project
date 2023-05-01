import { DB_NAME, MONGODB_URI, TEST_DB_NAME } from "../constants/constants";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IServerError } from "../types/misc-types";
import { NextFunction } from "express";
import { ReasonPhrases } from "http-status-codes";

export const buildErrorMessage = (
	type: string,
	cause: string,
	location: string,
	errors: any
) => ({
	type,
	cause,
	location,
	errors,
});

export const getDbName = () => {
	if (process.env.NODE_ENV === "test") {
		return TEST_DB_NAME;
	} else {
		return DB_NAME;
	}
};

export const getDbUri = async () => {
	if (process.env.NODE_ENV === "test") {
		const mongod = await MongoMemoryServer.create();
		return mongod.getUri();
	} else {
		return MONGODB_URI || "";
	}
};

/**
 * This is a helper functioning to help handle errors that can occur in controllers and services.
 * Controller functions tend to get bloated for no reaon. This functio aims to reduce that bloat.
 * @param {NextFunction} next
 * @param {any} error
 * @param {(IServerError & { reasons: string[] })[]} errorOptions
 */
export const handleControllerError = (
	next: NextFunction,
	error: any,
	errorOptions: (IServerError & { reasons: string[] })[]
) => {
	let reasonPhrase: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
	let cause = "An unknown error occurred while trying to process your request";
	if (error instanceof Error) {
		for (const item of errorOptions) {
			if (item.reasons.includes(error.message)) {
				cause = item.cause || "";
				reasonPhrase = item.type || "";
			}
		}
	}
	const errorMessage = buildErrorMessage(
		reasonPhrase,
		cause,
		"CONTROLLER_SERVICE",
		error?.toString()
	);
	next(errorMessage);
};
