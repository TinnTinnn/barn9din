import {createContext, useState} from "react";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add Book to cart
    const addToCart = (book) => {
        setCart((prevCart) => [...prevCart, book])
    }

    // Remove book from cart
    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter(book => book._id !== bookId))
    }

    return (
        <CartContext.Provider value={{ cart, addToCart , removeFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider