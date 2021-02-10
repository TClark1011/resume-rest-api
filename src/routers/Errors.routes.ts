import { Router } from "express";
import ServerError from "../utils/ServerError";

const ErrorRouter = Router();

ErrorRouter.all("/:status(\\d+)", (req, res): void => {
	const status = Number(req.params.status);
	throw new ServerError("You have caused an error", status);
});

ErrorRouter.all("/:status(\\d+)/:extraData", (req, res): void => {
	const status = Number(req.params.status);
	const extraData = req.params.extraData;
	throw new ServerError("You have caused an error", status, extraData);
});

export default ErrorRouter;
