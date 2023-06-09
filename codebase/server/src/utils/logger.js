import { createLogger, format, transports } from "winston";

const customFormat = format.printf(
    ({ level, message, label, timestamp, moduleName }) =>
        `${timestamp} ${level.toUpperCase()} - [${label}] \{${moduleName}\} : ${message}`
);

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.label({ label: "AF" }),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        customFormat
    ),
    transports: [
        new transports.Console(),
    ],
});

const initializeLogger = (moduleName) =>
    logger.child({ moduleName: moduleName });

export default initializeLogger;
