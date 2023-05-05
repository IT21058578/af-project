import { NextFunction, Request, Response } from "express";
import { IServerError } from "../types/misc-types.js";
import { ReasonPhrases, StatusCodes, getStatusCode } from "http-status-codes";

const errorHandler =
	() =>
	async (
		err: IServerError | any,
		_req: Request,
		res: Response,
		_next: NextFunction
	) => {
		if (err.type && err.cause && err.location) {
			return res.status(getStatusCode(err.type)).json(err);
		} else {
			const errorMessage: IServerError = {
				cause: "Unknown",
				errors: err,
				location: "Unknown",
				type: ReasonPhrases.INTERNAL_SERVER_ERROR,
			};
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorMessage);
		}
	};

export default errorHandler;
