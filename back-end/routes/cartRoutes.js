import express from "express";
import {auth} from "../middlewares/auth.js";
import {addToCart, clearCart, getCart, removeFromCart} from "../controllers/cartsController.js";


const router = express.Router()

// Get cart items
router.get('/', auth, getCart);

// Add book to cart
router.post('/', auth, addToCart);

// Remove book from cart
router.delete('/:bookId', auth, removeFromCart);

// Clear entire cart
router.delete('/', auth, clearCart);

export { router as cartRoutes }