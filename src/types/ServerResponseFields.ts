interface ServerResponseFields {
	message: string;
	tone: "positive" | "negative";
	extraData?: unknown;
}

export default ServerResponseFields;
