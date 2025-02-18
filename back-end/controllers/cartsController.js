import Cart from "../models/CartModel.js";
import Book from "../models/BooksModel.js";
import mongoose from "mongoose";


/************************  Get Cart Items *************************/
const getCart = async  (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user._id}).populate("items.book");
        if (!cart) return res.status(200).json({items: []})

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/************************  Add Item to Cart  *************************/
const addToCart = async  (req, res) => {
    const { bookId, amountInCart } = req.body;

    try {
        const book = await Book.findById(bookId);
        if(!book) return res.status(404).json({ error: "Book not found" });

        // Check if the requested amountInCart exceeds the stock
        if (amountInCart > book.amount) {
            return res.status(400).json({ error: `You cannot add more than ${book.amount} items to the cart`})
        }

        let cart = await Cart.findOne({ user: req.user._id})

        if(!cart) {
            // If no cart exists, create one
            cart = await Cart.create({ user: req.user._id, items: [{ book: bookId, amountInCart}]})

        }else {
            // Find index of the existing book in the cart
            const itemIndex = cart.items.findIndex(item => item.book.equals(bookId))

            if (itemIndex > -1) {
                // If the book is already in the cart, update the quantity
                cart.items[itemIndex].amountInCart += amountInCart;
            } else {
                // If the book is not in the cart, add it
                cart.items.push({ book: bookId, amountInCart });
            }
        }
        await cart.save();

        // Populate book info for title, writer, price
        const populateCart = await Cart.findById(cart._id).populate({
            path: "items.book",
            select: "title writer price amount"
        })

        res.status(200).json({ success: "Item added to cart", cart: populateCart });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

/************************  Remove Item From Cart  *************************/
const removeFromCart = async  (req, res) => {
    const { bookId } = req.params;

   try {
       const cart = await Cart.findOne({ user: req.user._id })

       if (!cart) {
           return res.status(404).json({ error: "Cart not found" });
       }


       const itemIndex = cart.items.findIndex(item => item.book.equals(bookId))

       if (itemIndex === -1) {
           return res.status(404).json({ error: "Book not found in cart" });
       }

       // Remove all amount of book form cart
       cart.items.splice(itemIndex, 1);


       // If cart empty will set cart to 'items= []'
       if (cart.items.length === 0 ) {
           cart.items = [];
       }

       await cart.save();
       return res.status(200).json({ success: "Cart deleted because it is empty" });

   } catch (error) {
       res.status(500).json({ error: error.message });
   }
}

/************************  Clear Cart  *************************/
const clearCart = async  (req, res) => {
    try {
        await Cart.findOneAndDelete({ user: req.user._id})
        res.status(200).json({ success: "Cart cleared" });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export { getCart, addToCart, removeFromCart, clearCart };