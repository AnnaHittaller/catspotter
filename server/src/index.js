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

app.use(cors())
app.use(cookieParser()); // reads cookies in every request
app.use(express.json()) // handle body object from requests

app.use("/users", userRoutes)
app.use("/cats", catRoutes)


app.listen(5000, () => console.log("Server is running on port 5000"));