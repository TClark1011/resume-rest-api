import { Response } from "express";
import ServerResponseFields from "../types/ServerResponseFields";

interface ExtraOptions {
	extraData?: unknown;
	status?: number;
}

/**
 * Send a positive server response
 *
 * @param {Response} res http response object
 * @param {string} message The message to send
 * @param {ExtraOptions} [options] Extra options about the request
 * @param {any} [options.extraData=null] Extra data to send with the request
 * @param {number} [options.status=200] The http status code of the response
 */
const sendResponse = (
	res: Response,
	message: string,
	{ extraData = null, status = 200 }: ExtraOptions = {}
): void => {
	const response: ServerResponseFields = { message, "tone": "positive" };
	if (extraData) {
		response.extraData = extraData;
	}
	res.status(status).json(response);
};

export default sendResponse;
