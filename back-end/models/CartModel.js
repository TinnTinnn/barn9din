import mongoose from "mongoose";


const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    items: [
        {
            book: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "Book",
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, { timestamps: true });

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;