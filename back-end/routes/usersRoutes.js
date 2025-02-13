import express from 'express'
import {registerUser, loginUser, logoutUser, adminLogin, userLogin} from '../controllers/usersController.js'
import {adminMiddleware, auth} from "../middlewares/auth.js";

const router = express.Router()

// Register user route
router.post('/register', registerUser)

// Login user route
router.post('/login', loginUser)

// Logout user route
router.post('/logout', logoutUser)

// Route user login
router.get('/cart', auth, userLogin)

// Route Admin
router.get('/admin/dashboard', auth, adminMiddleware, adminLogin)

export { router as usersRoutes }