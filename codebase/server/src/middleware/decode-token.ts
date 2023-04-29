import { TokenService } from "../services/token-service";
import initializeLogger from "../utils/logger";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { buildErrorMessage } from "../utils/misc-utils";
import { NextFunction, Request, Response } from "express";
import { TRoleValue } from "../types/constant-types";

const log = initializeLogger(__filename.split("\\").pop() || "");

const decodeToken =
	() => async (req: Request, _res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ").pop();
		if (token) {
			try {
				log.info(token);
				const { id, roles } = (await TokenService.decodeAccessToken(
					token
				)) as unknown as {
					id: string;
					roles: TRoleValue[];
				};
				req.headers["user-id"] = id;
				req.headers["user-roles"] = roles;
				next();
			} catch (error) {
				log.error(`An error occurred while decoding access token : ${error}`);
				next(
					buildErrorMessage(
						ReasonPhrases.UNAUTHORIZED,
						"User has an access token but it is invalid",
						"TOKEN_DECODING",
						error
					)
				);
			}
		}
	};

export default decodeToken;
