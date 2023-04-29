import {
	checkSchema,
	matchedData,
	validationResult,
	Schema,
	Location,
} from "express-validator";
import initializeLogger from "../utils/logger";
import { NextFunction, Request, Response } from "express";
import { buildErrorMessage } from "../utils/misc-utils";
import { ReasonPhrases } from "http-status-codes";

const log = initializeLogger(__filename.split("\\").pop() || "");

const validateSchema = (
	schema: Schema,
	defaultLocations: Location[] = ["body"]
) => {
	const first = checkSchema(schema, defaultLocations);
	const second = async (req: Request, _res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			log.warn("Rejected request due to bad data");
			next(
				buildErrorMessage(
					ReasonPhrases.BAD_REQUEST,
					"Request does not have appropriate fields in valid formats",
					"REQUEST_VALIDATION",
					errors
				)
			);
		} else {
			log.info("Filtering out unvalidated data from request body");
			req.body = matchedData(req, {
				includeOptionals: true,
				locations: ["body"],
			});
			next();
		}
	};
	return [first, second];
};

export default validateSchema;
