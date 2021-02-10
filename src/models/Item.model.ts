import { model, Schema, Document } from "mongoose";

export interface IItem extends Document {
	name: string;
	quantity?: number;
	description?: string;
}

const ItemSchema = new Schema({
	"name": { "type": String, "required": true },
	"quantity": { "type": Number, "default": 1 },
	"description": { "type": String },
});

export default model<IItem>("item", ItemSchema);
