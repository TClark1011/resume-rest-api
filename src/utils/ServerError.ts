class ServerError extends Error {
	constructor(
		public message: string,
		public status: number = 500,
		public extraData: unknown = null
	) {
		super(message);
		this.status = status;
		this.extraData = extraData;
	}
}

export default ServerError;
