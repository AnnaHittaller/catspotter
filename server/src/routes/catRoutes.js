import express from "express";
import { handleAddCat, handleListCats } from "../controllers/catController.js";

import upload from "../config/multer-cloudinary.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//add auth back to upload when it will be corrected

router.post("/add",  upload.single("image"), handleAddCat);
router.get("/list", handleListCats) //check if unloggedin users can see posts at all?
//router.get("/list", auth, handleListCats);  

export default router;