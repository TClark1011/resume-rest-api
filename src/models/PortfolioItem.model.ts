import { model, Schema, Document } from "mongoose";
import { PortfolioItemProps } from "tc-resume-api-type-defs";

const PortfolioItemSchema = new Schema({
	"name": { "type": String, "required": true },
	"description": { "type": String, "default": "" },
	"tags": { "type": [String], "default": [] },
	"images": { "type": [String], "default": [] },
	"live_link": { "type": String },
	"git_link": { "type": String },
});

export default model<PortfolioItemProps & Document>(
	"portfolio_item",
	PortfolioItemSchema
);
