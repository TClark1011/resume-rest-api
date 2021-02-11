import throwEnv from "throw-env";
import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const NODE_ENV = throwEnv("NODE_ENV");
export const MONGO_URI = throwEnv("MONGO_URI");
export const ACCESS_KEY = throwEnv("ACCESS_KEY");
