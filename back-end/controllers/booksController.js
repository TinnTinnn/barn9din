import Book from "../models/BooksModel.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";


/************************  Get All Books *************************/
const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({books});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/************************  Create new Book *************************/
const addBook = async (req, res) => {

    // Grab the data from request body
    const {title, writer} = req.body

    // Check user does exits
    // res.json(req.user)

    // Check the fields are not empty
    if (!title || !writer) {
        return res.status(400).json({error: 'All fields are required'});
    }

    // Grab the authenticated user form request body
    const user = await User.findById(req.user._id)

    try {
        const book = await Book.create({user: user._id, title, writer})
        res.status(200).json({success: 'Book created successfully.', book});

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

/************************  Delete Book *************************/
const deleteBook = async (req, res) => {
    // Check the ID is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({error: 'Incorrect ID'});
    }

    // Check the book exists
    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(400).json({error: 'Book not found'});
    }

    // Check the user owns the post
    const user = await User.findById(req.user._id)
    if (!book.user.equals(user._id)){
        return res.status(401).json({error: 'Not authorized'});
    }

    try {
        await book.deleteOne()
        res.status(200).json({
            success: 'Book deleted successfully.',
            // book   //Uncomment this line. If i need a detail the book i'v deleted
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

/************************  Update  Book *************************/
const updateBook = async (req, res) => {
    // Grab the data from request body
    const {title, writer} = req.body

    // Check the fields are not empty
    if (!title || !writer) {
        return res.status(400).json({error: 'All fields are required'});
    }

    // Check the ID is valid type
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({error: 'Incorrect ID'});
    }

    // Check the book exists
    const book = await Book.findById(req.params.id)
    if (!book) {
        return res.status(404).json({error: 'Book not found'});
    }

    // Check the user owns the post
    const user = await User.findById(req.user._id)
    if (!book.user.equals(user._id)){
        return res.status(401).json({error: 'Not authorized'});
    }

    try {
        await book.updateOne({title, writer},)
        res.status(200).json({success: 'Book updated successfully.'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {getBooks, addBook, deleteBook, updateBook}