import { MONGO_URI } from "./constants/environment";
import express from "express";
import helmet from "helmet";
import errorMiddleware from "./middleware/errorMiddleware";
import expressLogger, { winstonLog } from "./middleware/loggingMiddleware";
import ErrorRouter from "./routers/Errors.routes";
import cors from "cors";
import ServerError from "./utils/ServerError";
import RootRouter from "./routers/Root.routes";
import ifNotTesting from "./utils/ifNotTesting";
import { connect } from "mongoose";
import ModelController from "./utils/ModelController";
import PortfolioItemModel from "./models/PortfolioItem.model";
import SkillModel from "./models/Skill.model";

connect(
	MONGO_URI,
	{ "useUnifiedTopology": true, "useNewUrlParser": true },
	(err) => {
		err
			? winstonLog(
				"There was an error connecting to mongodb atlas: " + err,
				"error"
			  )
			: winstonLog("Connected to MongoDB Atlas");
	}
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
ifNotTesting(() => app.use(expressLogger));

app.use("/", RootRouter); //Router to handle requests to the root url
app.use("/portfolio", new ModelController(PortfolioItemModel).getRouter());
app.use("/skills", new ModelController(SkillModel).getRouter());
app.use("/error", ErrorRouter); //Router to test error handling

//# Catch-all route to handle requests that are not caught by any other routes
app.all("/*", () => {
	throw new ServerError("URL not found", 404);
});

app.use(errorMiddleware);

export default app;
