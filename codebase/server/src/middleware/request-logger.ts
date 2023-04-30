import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger";

const log = initializeLogger(__filename.split("\\").pop() || "");

const requestLogger =
	() => (req: Request, _res: Response, next: NextFunction) => {
		log.info(`Received request at ${req.originalUrl}`);
		next();
	};

export default requestLogger;
