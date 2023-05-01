import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { server } from "../..";

const teardown = async () => {
	console.log("Clearing test database...");
	await mongoose.disconnect();
};

module.exports = teardown;
