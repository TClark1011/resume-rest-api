import { model, Schema, Document } from "mongoose";

export interface ISkill extends Document {
	name: string;
	level: 1 | 2 | 3;
}

const SkillSchema = new Schema({
	"name": { "type": String, "required": true },
	"level": { "type": Number, "required": true, "enum": [1, 2, 3] },
});

export default model<ISkill>("skill", SkillSchema);
