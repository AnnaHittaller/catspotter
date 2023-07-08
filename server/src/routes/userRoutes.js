import express from 'express'
import { handleRegisterUser, handleLoginUser, handleLogoutUser, handleDeleteUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/register', handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/logout", handleLogoutUser);
router.delete("/delete/:id", handleDeleteUser);

export default router
