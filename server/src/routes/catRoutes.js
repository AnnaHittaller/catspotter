import express from "express";
import {
	handleAddCat,
	handleListCats,
	handleListCat,
	handleDeleteCat,
	handleUpdateCat,
	handleFilterCatsByLocation,
	handleFindMatches
} from "../controllers/catController.js"; 

import upload from "../config/multer-cloudinary.js";
import auth from "../middleware/auth.js";

const router = express.Router(); 

router.post("/add", auth, upload.single("image"), handleAddCat);
router.get("/list", handleListCats);
router.get("/listone/:id", handleListCat);
router.get("/listbylocation", auth, handleFilterCatsByLocation);
router.get("/listmatches", auth, handleFindMatches);
router.put("/updatecat/:id", auth, upload.single("image"), handleUpdateCat);
router.delete("/delete/:id", auth, handleDeleteCat);

export default router;
