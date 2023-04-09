import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import mongoose from "mongoose";
import initializeLogger from "./utils/logger.js";

import blogRoutes from './routes/blogs.js';
import userRouter from "./routes/user.js";

dotenv.config();

const log = initializeLogger(import.meta.url.split("/").pop() || "");

log.info("Starting server...");
const { PORT, MONGODB_URI } = process.env;

const app = express();

// Configuration
log.info("Configuring middleware...");
app.use(helmet());
app.use(cors());

// Routes
log.info("Configuring routes...");

// Database Connection
log.info("Connecting to MongoDB Atlas...");
await mongoose.connect(MONGODB_URI);
log.info("Established connection");

app.listen(
    PORT || 3000,
    () => { log.info(`Started listening to port ${PORT}`) }
);

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))

app.use("/user", userRouter);
app.use('/blogs', blogRoutes);