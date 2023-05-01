import { TokenService } from "../services/token-service";
import initializeLogger from "../utils/logger";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { buildErrorMessage } from "../utils/misc-utils";
import { NextFunction, Request, Response } from "express";
import { TRoleValue } from "../types/constant-types";
import { IServerError } from "../types/misc-types";

const log = initializeLogger(__filename.split("\\").pop() || "");

const decodeToken =
	() => async (req: Request, _res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ").pop();
		let errorMessage: IServerError | undefined;
		if (token) {
			log.info("Possible token detected");
			try {
				const {
					payload: { id, roles },
				} = await TokenService.decodeAccessToken(token);
				req.headers["user-id"] = id as string;
				req.headers["user-roles"] = roles as string[];
			} catch (error) {
				log.error(`An error occurred while decoding access token : ${error}`);
				errorMessage = buildErrorMessage(
					ReasonPhrases.UNAUTHORIZED,
					"User has an access token but it is invalid",
					"TOKEN_DECODING",
					error
				);
			}
		}
		next(errorMessage);
	};

export default decodeToken;
