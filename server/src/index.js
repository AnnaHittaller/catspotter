import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
import catRoutes from "./routes/catRoutes.js";
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config()
dbConnect()
const app = express()

const corsOptions = {
	origin:
		process.env.NODE_ENV === "production"
			? process.env.CLIENT
			: "http://localhost:3000",
	credentials: true,
	preflightContinue: true,
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions))
app.use(cookieParser()); // reads cookies in every request
app.use(express.json()) // handle body object from requests

app.use("/users", userRoutes)
app.use("/cats", catRoutes)


app.listen(5000, () => console.log("Server is running on port 5000"));