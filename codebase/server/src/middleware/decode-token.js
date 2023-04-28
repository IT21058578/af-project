import { TokenService } from "../services/token-service";
import initializeLogger from "../utils/logger";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const decodeToken = () => (req, res, next) => {
	const token = req.headers.authorization.split(" ").pop();
	if (token) {
		try {
			log.info(token);
			const { id, roles } = TokenService.decodeAccessToken(token);
			req.headers["user-id"] = id;
			req.headers["user-roles"] = roles;
			next();
		} catch (error) {
			log.error(`An error occurred while decoding access token : ${error}`);
			res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
		}
	}
};

export default decodeToken;
