import { model, Schema, Document } from "mongoose";
import { SectionProps } from "tc-resume-common";

const SectionSchema = new Schema({
	name: { type: String, required: true },
	body: { type: String, required: true },
});

export default model<SectionProps & Document>("section", SectionSchema);
