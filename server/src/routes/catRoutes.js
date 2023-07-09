import express from "express";
import { handleAddCat } from "../controllers/catController.js";

import upload from "../config/multer-cloudinary.js";

const router = express.Router();

router.post("/add", upload.single("image"), handleAddCat);

export default router;