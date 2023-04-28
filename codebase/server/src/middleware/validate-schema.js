import { checkSchema, matchedData, validationResult } from "express-validator";
import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const validateSchema = (schema, defaultLocations) => {
	const first = checkSchema(schema, defaultLocations);
	const second = async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			log.warn("Rejected request due to bad data");
			return res.status(400).json(errors);
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
