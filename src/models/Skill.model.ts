import { model, Schema, Document } from "mongoose";
import { SkillProps } from "tc-resume-api-type-defs";

const SkillSchema = new Schema({
	"name": { "type": String, "required": true },
	"level": { "type": Number, "required": true, "enum": [1, 2, 3] },
});

export default model<SkillProps & Document>("skill", SkillSchema);
