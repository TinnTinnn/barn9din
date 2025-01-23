import mongoose from 'mongoose';

const BooksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Book = mongoose.model("Book", BooksSchema);


export default Book;