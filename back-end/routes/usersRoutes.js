import express from 'express'
import {registerUser, loginUser, logoutUser} from '../controllers/usersController.js'

const router = express.Router()

// Register user route
router.post('/register', registerUser)

// Login user route
router.post('/login', loginUser)

// Logout user route
router.post('/logout', logoutUser)

export { router as usersRoutes }