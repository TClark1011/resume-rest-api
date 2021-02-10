import { model, Schema, Document } from "mongoose";

export interface IPortfolioItem extends Document {
	name: string;
	description: string;
	link?: string;
	tags: string[];
	images: string[];
}

const PortfolioItemSchema = new Schema({
	"name": { "type": String, "required": true },
	"description": { "type": String, "default": "" },
	"link": { "type": String },
	"tags": { "type": [String], "default": [] },
	"images": { "type": [String], "default": [] },
});

export default model<IPortfolioItem>("portfolio_item", PortfolioItemSchema);
