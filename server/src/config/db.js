import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import Cat from "../models/Cat.js";
dotenv.config();

async function dbConnect() {
	try {
		await mongoose.connect(process.env.DB_URI);
		console.log("Connected to DB");

		await User.createIndexes();
		await Cat.createIndexes();
		console.log("Indexes created successfully");
	} catch (error) {
		console.log("Error connecting to DB:", error.message);
	}
}

export default dbConnect;
