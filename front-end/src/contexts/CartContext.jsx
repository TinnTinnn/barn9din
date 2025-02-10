import {createContext, useState} from "react";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add Book to cart
    const addToCart = (book, increaseAmount = false) => {
        if (increaseAmount) {
            // increase amount of existing book
            setCart(prevCart => prevCart.map(item =>
            item._id === book._id ? {...item, amount: item.amount + 1 } : item
            ))
        } else {
            setCart(prevCart => [...prevCart, {...book, amount: 1}])
        }
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