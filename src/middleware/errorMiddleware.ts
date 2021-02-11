import { NextFunction, Request, Response } from "express";
import { ServerResponseFields } from "tc-resume-api-type-defs";
import ServerError from "../utils/ServerError";

/**
 * Middleware for handling errors
 *
 * @param {ServerError} err The error object
 * @param {Request} req The http request object
 * @param {Response} res The http response object
 * @param {NextFunction} next The function to pass request to the next endpoint
 */
const errorMiddleware = (
	err: ServerError,
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const { status, message, extraData } = err;
	const response: ServerResponseFields<unknown> = {
		message,
		"tone": "negative",
	};
	if (extraData) {
		response.extraData = extraData;
	}
	res.status(status || 500).json(response);
	next();
};

export default errorMiddleware;
