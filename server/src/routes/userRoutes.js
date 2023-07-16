import express from 'express'
import { handleRegisterUser, handleLoginUser, handleLogoutUser, handleDeleteUser, handleUpdateUser, handleEmailConfirm , handleForgotPassword, handleChangePassword} from '../controllers/userController.js'

import upload from "../config/multer-cloudinary.js";
import auth from '../middleware/auth.js';

const router = express.Router()

router.post('/register', handleRegisterUser);
//router.post('/emailconfirm/', handleEmailConfirm)
router.post("/login", handleLoginUser);
router.post("/logout", handleLogoutUser);
//router.post("/forgotpass", handleForgotPassword);
//router.post("/changepass", handleChangePassword);
router.delete("/delete/:id", auth, handleDeleteUser);
router.put('/updateprofile', auth, upload.single("avatar"), handleUpdateUser)


export default router;
 
