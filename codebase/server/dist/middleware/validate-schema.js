import { checkSchema, matchedData, validationResult, } from "express-validator";
import initializeLogger from "../utils/logger.js";
import { buildErrorMessage } from "../utils/misc-utils.js";
import { ReasonPhrases } from "http-status-codes";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const validateSchema = (schema, defaultLocations = ["body"]) => {
    const first = checkSchema(schema, defaultLocations);
    const second = (req, _res, next) => {
        const errors = validationResult(req);
        let errorMessage;
        if (!errors.isEmpty()) {
            log.warn("Rejected request due to bad data");
            errorMessage = buildErrorMessage(ReasonPhrases.BAD_REQUEST, "Request does not have appropriate fields in valid formats", "REQUEST_VALIDATION", errors.mapped());
        }
        else {
            log.info("Filtering out unvalidated data from request body");
            req.body = matchedData(req, {
                includeOptionals: true,
                locations: ["body"],
            });
        }
        next(errorMessage);
    };
    return [first, second];
};
export default validateSchema;
