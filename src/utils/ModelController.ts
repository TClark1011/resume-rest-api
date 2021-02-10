/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Model } from "mongoose";
import { NextFunction, Request, Response, Router } from "express";
import sendResponse from "./sendResponse";
import ServerError from "./ServerError";

class ModelController {
	private Model: Model<any>;
	private Router: Router;
	public name: string;
	constructor(Model: Model<any>) {
		this.Model = Model;
		this.name = Model.collection.collectionName;
		this.Router = Router();
	}
	//TODO: Parameter for what fields to return when fetching all (if you dont want to see all the fields when fetching all instances)
	//TODO: Middleware support
	//TODO: Param for route urls

	/**
	 * Fetch all documents
	 *
	 * @param {Request} req The http request object
	 * @param {Response} res The http response object
	 * @returns {object[]} All instanced of the model documents
	 */
	fetchAll = async (req: Request, res: Response): Promise<void> => {
		const data = await this.Model.find();
		sendResponse(res, `Fetched all instances of ${this.name}`, {
			"extraData": data,
		});
	};

	/**
	 * Fetch a single document
	 *
	 * @param {Request} req The http request object
	 * @param {Response} res The http response object
	 * @param {NextFunction} next Pass an error to error handler
	 * @returns {object[]} All instanced of the model documents
	 */
	fetchOne = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			mongoose.Types.ObjectId(req.params._id);
		} catch (err) {
			next(new ServerError("Invalid ObjectId", 400));
			return;
		}
		const result = await this.Model.find({ "_id": req.params._id });
		if (result.length === 0) {
			next(new ServerError("Item was not found", 404));
			return;
		}
		sendResponse(res, "Fetched item", {
			"extraData": result[0],
		});
	};

	/**
	 * Create new document
	 *
	 * @param {Request} req The http request object
	 * @param {Response} res The http response object
	 * @returns {ServerResponseFields} The newly created document
	 */
	create = async (req: Request, res: Response): Promise<void> => {
		const newDocument = new this.Model(req.body);
		await newDocument.save();
		sendResponse(res, `Created new instance of ${this.name}`, {
			"extraData": newDocument,
		});
	};

	/**
	 * Delete document
	 *
	 * @param {Request} req The http request object
	 * @param {Response} res The http response object
	 * @returns {object[]} The list of remaining objects
	 */
	delete = async (req: Request, res: Response): Promise<void> => {
		const result = await this.Model.deleteMany(req.body);
		sendResponse(
			res,
			`Deleted ${result.deletedCount} instances of ${this.name}`,
			{
				"extraData": await this.Model.find(),
			}
		);
	};

	/**
	 * Update a document
	 *
	 * @param {Request} req The http request object
	 * @param {Response} res The http response object
	 * @returns {object[]} The list of remaining objects
	 */
	update = async (req: Request, res: Response): Promise<void> => {
		const result = await this.Model.findById(req.body._id);
		for (const field of Object.keys(req.body)) {
			result[field] = req.body[field];
		}
		await result.save();
		sendResponse(res, "Updated document", {
			"extraData": result,
		});
	};

	/**
	 * Generates a new router
	 *
	 * @returns {Router} The router for handling requests related to the Model
	 */
	getRouter = (): Router => {
		this.Router.get("/", this.fetchAll);
		this.Router.get("/:_id", this.fetchOne);
		this.Router.post("/", this.create);
		this.Router.delete("/", this.delete);
		this.Router.put("/", this.update);
		return this.Router;
	};
}

export default ModelController;
