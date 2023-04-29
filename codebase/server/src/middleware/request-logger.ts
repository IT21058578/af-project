import { NextFunction, Request, Response } from "express";
import initializeLogger from "../utils/logger.js";

const log = initializeLogger(import.meta.url.split("/").pop() || "");

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
	log.info(`Received request at ${req.originalUrl}`);
	next();
};

export default requestLogger;
