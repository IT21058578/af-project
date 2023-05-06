import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import initializeLogger from "./utils/logger.js";

import authRoutes from "./routes/auth-routes.js";
import postRoutes from "./routes/post-routes.js";
import userRoutes from "./routes/user-routes.js";
import packageRoutes from "./routes/package-routes.js";
import locationRoutes from "./routes/location-routes.js";
import commentRoutes from "./routes/comment-routes.js";

import decodeToken from "./middleware/decode-token.js";
import { PORT } from "./constants/constants.js";
import requestLogger from "./middleware/request-logger.js";
import errorHandler from "./middleware/error-handler.js";
import { getDbName, getDbUri } from "./utils/misc-utils.js";
import Stripe from "stripe";
dotenv.config();

const log = initializeLogger(import.meta.url.split("/").pop() || "");

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
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/packages", packageRoutes);
app.use("/api/v1/comments", commentRoutes);


app.use(errorHandler());

// Database Connection
log.info("Connecting to MongoDB...");
(async () => {
	mongoose.connect(await getDbUri(), { dbName: getDbName() }).then(() => {
		log.info("Established connection");
		app.listen(PORT || 3000, () => {
			log.info(`Started listening to port ${PORT}`);
		});
	});
})();

export const stripe = new Stripe("secret_key", {
	apiVersion: "2022-11-15",
	typescript: true,
});

export const server = app;
