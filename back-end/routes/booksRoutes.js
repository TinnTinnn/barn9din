import express from 'express'
import {addBook, getBooks, getUserBooks, deleteBook, updateBook} from "../controllers/booksController.js";
import {auth} from "../middlewares/auth.js";

const router = express.Router()

//  Get all books route
router.get('/', getBooks);

//  Get User books route
router.get('/user', auth, getUserBooks);

// Add new book route
router.post('/', auth, addBook)

// Delete book route
router.delete('/:id', auth, deleteBook)

// Update book route
router.put('/:id', auth, updateBook)

export {router as booksRoutes}