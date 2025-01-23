import express from 'express'
import {addBook, getBooks, deleteBook, updateBook } from "../controllers/booksController.js";

const router = express.Router()

//  Get all books route
router.get('/', getBooks);

// Add new book route
router.post('/', addBook)

// Delete book route
router.delete('/:id', deleteBook)

// Update book route
router.put('/:id', updateBook)

export {router as booksRoutes}