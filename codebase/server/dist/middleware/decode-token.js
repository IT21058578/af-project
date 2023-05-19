import { TokenService } from "../services/token-service.js";
import initializeLogger from "../utils/logger.js";
import { ReasonPhrases } from "http-status-codes";
import { buildErrorMessage } from "../utils/misc-utils.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const decodeToken = () => async (req, _res, next) => {
    const token = req.headers.authorization?.split(" ").pop();
    let errorMessage;
    if (token) {
        log.info("Possible token detected");
        try {
            const { payload: { id, roles }, } = await TokenService.decodeAccessToken(token);
            req.headers["user-id"] = id;
            req.headers["user-roles"] = roles;
        }
        catch (error) {
            log.error(`An error occurred while decoding access token : ${error}`);
            errorMessage = buildErrorMessage(ReasonPhrases.UNAUTHORIZED, "User has an access token but it is invalid", "TOKEN_DECODING", error);
        }
    }
    next(errorMessage);
};
export default decodeToken;
