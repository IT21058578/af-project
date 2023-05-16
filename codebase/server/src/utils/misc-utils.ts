import { DB_NAME, MONGODB_URI, TEST_DB_NAME } from "../constants/constants.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { IServerError } from "../types/misc-types.js";
import { NextFunction, Request, Response } from "express";
import { ReasonPhrases } from "http-status-codes";
import initializeLogger from "./logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

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
	log.error(
		`An error occurred when trying to process a request. ERR: ${error}`
	);
	let reasonPhrase: string = ReasonPhrases.INTERNAL_SERVER_ERROR;
	let cause = "An unknown error occurred while trying to process your request";
	if (error instanceof Error) {
		for (const item of errorOptions) {
			if (item.reasons.includes(error.message)) {
				cause = item.cause || "";
				reasonPhrase = item.type || "";
			}
		}
		console.log(error.stack);
	}
	const errorMessage = buildErrorMessage(
		reasonPhrase,
		cause,
		"CONTROLLER_SERVICE",
		error?.toString()
	);
	next(errorMessage);
};
