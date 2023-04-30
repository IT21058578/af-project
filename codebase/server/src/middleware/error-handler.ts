import { NextFunction, Request, Response } from "express";
import { IServerError } from "../types/misc-types";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const errorHandler =
	() =>
	(
		err: IServerError | any,
		_req: Request,
		res: Response,
		_next: NextFunction
	) => {
		if (err.type && err.cause && err.location) {
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
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
