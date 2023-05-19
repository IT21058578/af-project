import initializeLogger from "../utils/logger.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
const requestLogger = () => (req, _res, next) => {
    log.info(`Received request at ${req.originalUrl}`);
    next();
};
export default requestLogger;
