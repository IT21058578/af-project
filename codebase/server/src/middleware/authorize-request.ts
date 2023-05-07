import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { buildErrorMessage } from "../utils/misc-utils.js";
import { TRoleValue } from "../types/constant-types.js";
import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const authorizeRequest =
	(allowedRoles: TRoleValue[]) =>
	async (req: Request, _res: Response, next: NextFunction) => {
		let hasAllowedRole = false;
		const userRoles = req.headers["user-roles"] as TRoleValue[] | undefined;
		const userId = req.headers["user-id"] as string | undefined;
		for (const role of userRoles || []) {
			console.log(userRoles);
			if (allowedRoles?.includes(role)) {
				hasAllowedRole = true;
				break;
			}
		}
		if (hasAllowedRole) next();
		else {
			log.warn(`A user with id ${userId} tried to access a protected route`);
			next(
				buildErrorMessage(
					ReasonPhrases.UNAUTHORIZED,
					"User does not have the appropriate roles to access this route",
					"REQUEST_AUTHORIZATION",
					{}
				)
			);
		}
	};

export default authorizeRequest;
