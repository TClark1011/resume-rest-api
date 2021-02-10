import { model, Schema, Document } from "mongoose";

export interface ISection extends Document {
	name: string;
	body: string;
}

const SectionSchema = new Schema({
	"name": { "type": String, "required": true },
	"body": { "type": String, "required": true },
});

export default model<ISection>("section", SectionSchema);
