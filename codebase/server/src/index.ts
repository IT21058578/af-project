import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import initializeLogger from "./utils/logger.js";

import authRoutes from "./routes/auth-routes.js";
import postRoutes from "./routes/post-routes.js";
import userRoutes from "./routes/user-routes.js";

import decodeToken from "./middleware/decode-token.js";

dotenv.config();

const log = initializeLogger(import.meta.url.split("/").pop() || "");

log.info("Starting server...");
const { PORT, MONGODB_URI } = process.env;

const app = express();

// Configuration
log.info("Configuring middleware...");
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(decodeToken());

// Routes
log.info("Configuring routes...");
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

// Database Connection
log.info("Connecting to MongoDB Atlas...");
await mongoose.connect(MONGODB_URI);
log.info("Established connection");

app.listen(PORT || 3000, () => {
	log.info(`Started listening to port ${PORT}`);
});
