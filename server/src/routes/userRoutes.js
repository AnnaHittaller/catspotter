import express from 'express'
import { handleRegisterUser, handleLoginUser, handleLogoutUser, handleDeleteUser, handleUpdateUser } from '../controllers/userController.js'

import upload from "../config/multer-cloudinary.js";

const router = express.Router()

router.post('/register', handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/logout", handleLogoutUser);
router.delete("/delete/:id", handleDeleteUser);
router.put('/updateprofile', upload.single("image"), handleUpdateUser)

export default router;


const cloudinary_url = "https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899663/" 
const rest = "catspotter-assets/notFound_BG_xyspbj.jpg"

console.log(cloudinary_url + rest)