import {createContext, useState} from "react";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add Book to cart
    const addToCart = (book, increaseAmount = false, decreaseAmount = false) => {
        if (increaseAmount) {
            // increase amount of existing book
            setCart(prevCart => prevCart.map(item =>
                item._id === book._id ? {...item, amount: item.amount + 1} : item
            ));
        } else if (decreaseAmount) {
            // decrease amount of existing book
            setCart(prevCart => prevCart.map(item =>
                item._id === book._id
                    ? {...item, amount: item.amount > 1 ? item.amount - 1 : 1} // Avoid going below 1
                    : item
            ));
        } else {
            setCart(prevCart => [...prevCart, {...book, amount: 1}]);
        }
    }

    // Remove book from cart with confirmation
    const removeFromCart = (bookId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this item from the cart?");
        if (confirmDelete) {
            setCart(prevCart => prevCart.filter(book => book._id !== bookId));
        }
    }

    // Remove all items from cart with confirmation
    const removeAllFromCart = () => {
        const confirmDelete = window.confirm("Are you sure you want to remove all items from the cart?");
        if (confirmDelete) {
            setCart([]);
        }
    }

    return (
        <CartContext.Provider value={{ cart, addToCart , removeFromCart ,removeAllFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider