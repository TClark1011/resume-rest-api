import { Router } from "express";
import sendResponse from "../utils/sendResponse";

const RootRouter = Router();

RootRouter.get("/", (req, res) =>
	sendResponse(res, "You have fetched the root url")
);

export default RootRouter;
