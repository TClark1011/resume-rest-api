import winston from "winston";
import expressWinston from "express-winston";
import LogLevel from "../types/LogLevel";
import "winston-daily-rotate-file";
import supportsColor from "supports-color";

const logFormat = winston.format.printf(
	({ level, message, timestamp }) => `[${timestamp}] [${level}] ${message}`
);

const baseFormat = winston.format.combine(
	winston.format.timestamp(),
	logFormat
);

const winstonInstance = winston.createLogger({
	"transports": [
		new winston.transports.DailyRotateFile({
			"filename": "logs/%DATE%.log",
			"datePattern": "YYYY-MM-DD",
			"format": baseFormat,
		}),
		new winston.transports.Console({
			"format": winston.format.combine(
				supportsColor.stdout
					? winston.format.colorize()
					: winston.format.uncolorize(),
				baseFormat
			),
		}),
	],
});

const expressLogger = expressWinston.logger({
	winstonInstance,
	"meta": true,
	"msg": "HTTP {{req.method}} {{req.url}}",
	"expressFormat": true,
	"statusLevels": true,
	"colorize": false,
});

export default expressLogger;

/**
 * Perform a console log with the same format used by the logging middleware
 *
 * @param {string} message The message to attach to the log
 * @param {LogLevel} level The level of the log
 */
export const winstonLog = (message: string, level: LogLevel = "info"): void => {
	winstonInstance.log({ message, level });
};
