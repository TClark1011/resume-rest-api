import app from "./app";
import { PORT } from "./constants/env";
import { winstonLog } from "./middleware/loggingMiddleware";

const serverPort = PORT || 4004;

app.listen(serverPort, () => {
	winstonLog("Server listening on port " + serverPort);
});
