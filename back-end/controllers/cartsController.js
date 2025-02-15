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
    const { bookId, amount } = req.body;

    try {
        const book = await Book.findById(bookId);
        if(!book) return res.status(404).json({ error: "Book not found" });

        let cart = await Cart.findOne({ user: req.user._id})

        if(!cart) {
            // If there is not cart will create one
            cart = await Cart.create({ user: req.user._id, items: [{ book: bookId, amount}]})

        }else {
            // Find index of book that already have
            const itemIndex = cart.items.findIndex(item => item.book.equals(bookId))

            if (itemIndex > -1) {
                // If found same id  will plus amount for one
                cart.items[itemIndex].amount += amount;
            } else {
                // If not will add another book in cart
                cart.items.push({ book: bookId, amount });
            }
        }
        await cart.save();

        // Populate book info for title, writer, price
        const populateCart = await Cart.findById(cart._id).populate({
            path: "items.book",
            select: "title writer price"
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

       // If had more than 1 then make amount down for 1
       if (cart.items[itemIndex].amount > 1) {
           cart.items[itemIndex].amount -= 1;
           await cart.save();
           return res.status(200).json({ success: "Item updated in cart", cart });
       }

       // ถ้ามีแค่ 1 เล่มให้ลบ Cart ทั้งหมดออกจาก database
       await Cart.deleteOne({ _id: cart._id });
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