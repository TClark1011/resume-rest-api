import { NextFunction, Request, Response } from "express";
import { ACCESS_KEY } from "../constants/env";

/**
 * Authenticate all non GET requests
 *
 * @param {Express.Request} req HTTP request
 * @param {Express.Response} res HTTP response
 * @param {Express.NextFunction} next Function to pass to next route
 */
const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	if (req.method === "GET" || req.headers.access_key === ACCESS_KEY) {
		next();
		return;
	}
	throw Error("bad access key");
};

export default authMiddleware;
