import {createContext, useEffect, useState} from "react";
import {addToCart, clearCart, getCart, removeFromCart} from "../Controllers/cartController.js";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({items: []});
    const [loading, setLoading] = useState(true);

    //  Grab cart data when first load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await getCart();
                setCart(cartData || {items: []});
            } catch (error) {
                console.error(error);
                setCart({items: []});
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, [setCart]);

    // Add book to cart
    const handleAddToCart = async (bookId, amountInCart) => {
        try {
            const data = await addToCart(bookId, amountInCart);
            setCart(data.cart);  // update cart
        } catch (error) {
            console.error(error);
        }
    }

    // Update cart
    const handleUpdateCart = (bookId, newAmount) => {
        setCart((prevState) => {
            const updatedCart = { ...prevState };
            const item = updatedCart.items.find((item) => item.bookId === bookId);
            if (item) {
                item.amount = newAmount;
            }

            return updatedCart;
        })
    }

    // Remove book from cart
    const handleRemoveFromCart = async (bookId) => {
        try {
            await removeFromCart(bookId);
            setCart(prevCart => ({
                ...prevCart,
                items: prevCart.items.filter(item => item.book._id !== bookId)
            }))
        } catch (error) {
            console.error(error);
        }
    }

    // Remove all from cart
    const handleClearCart = async () => {
        try {
            await clearCart();
            setCart(null); // clear state
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <CartContext.Provider value={{ cart, loading, handleAddToCart, handleUpdateCart, handleRemoveFromCart , handleClearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider