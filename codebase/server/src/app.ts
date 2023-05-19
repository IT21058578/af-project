import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import initializeLogger from "./utils/logger.js";

import authRoutes from "./routes/auth-routes.js";
import postRoutes from "./routes/post-routes.js";
import userRoutes from "./routes/user-routes.js";
import packageRoutes from "./routes/package-routes.js";
import locationRoutes from "./routes/location-routes.js";
import commentRoutes from "./routes/comment-routes.js";
import webhookRoutes from "./routes/webhook-routes.js";
import bookingRoutes from "./routes/booking-routes.js";

import decodeToken from "./middleware/decode-token.js";
import requestLogger from "./middleware/request-logger.js";
import errorHandler from "./middleware/error-handler.js";

dotenv.config();

const log = initializeLogger(import.meta.url.split("/").pop() || "");

log.info("Building app...");

const app = express();

// Configuration
log.info("Attaching raw routes...");
app.use("/api/v1/webhooks", webhookRoutes);

log.info("Configuring middleware...");
app.use(helmet());
app.use(cors());
app.use(urlencoded({ limit: "50mb" }));
app.use(json({ limit: "50mb" }));
app.use(requestLogger());
app.use(decodeToken());

// Routes
log.info("Attaching parsed routes...");
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/locations", locationRoutes);
app.use("/api/v1/packages", packageRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/bookings", bookingRoutes);

log.info("Configuring error handler...");
app.use(errorHandler());

export default app;
