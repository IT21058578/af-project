import { ReasonPhrases, StatusCodes, getStatusCode } from "http-status-codes";
const errorHandler = () => async (err, _req, res, _next) => {
    if (err.type && err.cause && err.location) {
        return res.status(getStatusCode(err.type)).json(err);
    }
    else {
        const errorMessage = {
            cause: "Unknown",
            errors: err,
            location: "Unknown",
            type: ReasonPhrases.INTERNAL_SERVER_ERROR,
        };
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
    }
};
export default errorHandler;
