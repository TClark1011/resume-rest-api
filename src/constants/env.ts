import * as dotenv from "dotenv";
dotenv.config();

const requiredEnvVars = ["NODE_ENV", "ACCESS_KEY", "MONGO_URI"];

/**
 * Fetch the value of an environment variable
 * Throw an error if the variable is undefined
 *
 * @param {string | undefined} envVar The environment variable you want to fetch
 * @returns {string} If the environment variable is defined, return its value
 */
const fetchEnvOrThrow = (envVar: string | undefined): string => {
	if (!envVar)
		throw Error(
			"A required environment variable is undefined. The required environment variables are: " +
				requiredEnvVars
		);
	return envVar as string;
};

export const PORT = process.env.PORT;
export const NODE_ENV = fetchEnvOrThrow(process.env.NODE_ENV);
export const MONGO_URI = fetchEnvOrThrow(process.env.MONGO_URI);
export const ACCESS_KEY = fetchEnvOrThrow(process.env.ACCESS_KEY);
