import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import initializeLogger from "./utils/logger";

import authRoutes from "./routes/auth-routes";
import postRoutes from "./routes/post-routes";
import userRoutes from "./routes/user-routes";

import decodeToken from "./middleware/decode-token";
import { PORT } from "./constants/constants";
import requestLogger from "./middleware/request-logger";
import errorHandler from "./middleware/error-handler";
import { getDbName, getDbUri } from "./utils/misc-utils";
dotenv.config();

const log = initializeLogger(__filename.split("\\").pop() || "");

log.info("Starting server...");

const app = express();

// Configuration
log.info("Configuring middleware...");
app.use(helmet());
app.use(cors());
app.use(json());
app.use(urlencoded());
app.use(requestLogger());
app.use(decodeToken());

// Routes
log.info("Configuring routes...");
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

app.use(errorHandler());

// Database Connection
log.info("Connecting to MongoDB...");
let server: any;
mongoose.connect(await getDbUri(), { dbName: getDbName() }).then(() => {
	log.info("Established connection");
	server = app.listen(PORT || 3000, () => {
		log.info(`Started listening to port ${PORT}`);
	});
});

export { server };
