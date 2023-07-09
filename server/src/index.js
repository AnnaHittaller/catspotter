import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import userRoutes from './routes/userRoutes.js'
import catRoutes from "./routes/catRoutes.js";
import dbConnect from './config/db.js';

dotenv.config()
dbConnect()
const app = express()

app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)
app.use("/cats", catRoutes)


app.listen(5000, () => console.log("Server is running on port 5000"));