import Book from "../models/BooksModel.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";


/************************  Get All Books *************************/
const getBooks = async (req, res) => {
    try {
        // Do paginate
        let page = parseInt(req.query.page) || 1; // Default to page 1 if no value is provided
        let limit = parseInt(req.query.limit) || 10; // Default to limit 10 if no value is provided

        // Check if page or limit values are valid (value than 0)
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({ error: "Invalid page or limit value" });
        }

        // Calculate the number of documents to skip for pagination
        const skip = (page - 1) * limit; // Calculate how many documents to skip based on the current page

        // Retrieve the books based on the calculated skip and limit
        const books = await Book.find().skip(skip).limit(limit);

        // Retrieve the total number of books in the collection
        const totalCount = await Book.countDocuments();

        if (!books.length) {
            return res.status(404).json({ error: "No books found" });
        }

        res.status(200).json({
            books,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


/************************  Get User Books *************************/
const getUserBooks = async (req, res) => {
    // Grab the authenticated user form request body
    const user = await User.findById(req.user._id)

    try {
        const userBooks = await Book.find({ user: user._id })
        res.status(200).json({userBooks});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}


/************************  Create new Book *************************/
const addBook = async (req, res) => {

    // Grab the data from request body
    const {title, writer, price, amount} = req.body

    // Check user does exits
    // res.json(req.user)

    // Check the fields are not empty
    if (!title || !writer || !price || !amount ) {
        return res.status(400).json({error: 'All fields are required'});
    }

    // Grab the authenticated user form request body
    const user = await User.findById(req.user._id)

    try {
        const book = await Book.create({user: user._id, title, writer, price, amount})
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
            // book   //Uncomment this line. If you need a detail the book have deleted
        });
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
};

/************************  Update  Book *************************/
const updateBook = async (req, res) => {
    // Grab the data from request body
    const {title, writer, price, amount} = req.body

    // Check the fields are not empty
    if (!title || !writer || !price || !amount) {
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
        await book.updateOne({title, writer, price, amount},)
        res.status(200).json({success: 'Book updated successfully.'});
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

export {getBooks, getUserBooks, addBook, deleteBook, updateBook}