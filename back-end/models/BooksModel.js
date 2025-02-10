import mongoose from 'mongoose';

const BooksSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },

    title: {
        type: String,
        required: true,
    },
    writer: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

const Book = mongoose.model("Book", BooksSchema);


export default Book;