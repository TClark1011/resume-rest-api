import app from "./app";
import { PORT } from "./constants/environment";
import { winstonLog } from "./middleware/loggingMiddleware";
import { Server } from "http";

const serverPort = PORT || 4004;

app.listen(serverPort, () => {
	winstonLog("Server listening on port " + serverPort);
});
