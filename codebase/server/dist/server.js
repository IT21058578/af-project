import mongoose from "mongoose";
import initializeLogger from "./utils/logger.js";
import { DB_NAME, MONGODB_URI, PORT } from "./constants/constants.js";
import app from "./app.js";
import { startScheduledTasks } from "./services/scheduler-service.js";
const log = initializeLogger(import.meta.url.split("/").pop() || "");
log.info("Connecting to MongoDB...");
(async () => {
    mongoose.connect(MONGODB_URI ?? "", { dbName: DB_NAME }).then(() => {
        log.info("Established connection");
        app.listen(PORT || 3000, () => {
            log.info(`Started listening to port ${PORT}`);
            startScheduledTasks();
        });
    });
})();
