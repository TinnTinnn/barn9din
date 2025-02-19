import {createContext, useEffect, useState} from "react";
import {addToCart, clearCart, getCart, removeFromCart} from "../Controllers/cartController.js";


export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({items: []});
    const [loading, setLoading] = useState(true);
    const [discount, setDiscount] = useState(0);
    const [netPrice, setNetPrice] = useState(0);

    const totalItems = cart.items.reduce((acc, item) => acc + item.amountInCart, 0)

    //  Grab cart data when first load
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cartData = await getCart();
                setCart(cartData || {items: []});
                calculateDiscount(cartData.items || [])
            } catch (error) {
                console.error(error);
                setCart({items: []});
            } finally {
                setLoading(false);
            }
        }
        fetchCart();
    }, [setCart]);

    // Calculate discount based on unique Harry Potter books in cart
    const calculateDiscount = (cartItems) => {
        const uniqueHarryPotterBooks = new Set();
        let totalPrice = 0; // ราคารวมทั้งหมด
        let uniqueBooksPrice = 0; // ราคาเฉพาะหนังสือที่ไม่ซ้ำกัน

        // คำนวณราคารวมทั้งหมดและราคาหนังสือที่ไม่ซ้ำกัน
        cartItems.forEach(item => {
            totalPrice += item.book.price * item.amountInCart; // คำนวณราคาหนังสือทั้งหมด

            if (item.book.title.includes("Harry Potter")) {
                if (!uniqueHarryPotterBooks.has(item.book.title)) {
                    uniqueHarryPotterBooks.add(item.book.title); // เพิ่มหนังสือ Harry Potter ที่ไม่ซ้ำ
                    uniqueBooksPrice += item.book.price; // เพิ่มราคาเฉพาะหนังสือที่ไม่ซ้ำ
                }
            }
        });

        const uniqueCount = uniqueHarryPotterBooks.size; // จำนวน Harry Potter ที่ไม่ซ้ำกัน
        let discountRate = 0;

        // คำนวณส่วนลดตามจำนวนหนังสือที่ไม่ซ้ำกัน
        if (uniqueCount === 2) discountRate = 0.10;
        else if (uniqueCount === 3) discountRate = 0.20;
        else if (uniqueCount === 4) discountRate = 0.30;
        else if (uniqueCount === 5) discountRate = 0.40;
        else if (uniqueCount === 6) discountRate = 0.50;
        else if (uniqueCount === 7) discountRate = 0.60;

        // คำนวณส่วนลดจากราคาหนังสือที่ไม่ซ้ำกัน
        const discount = uniqueBooksPrice * discountRate;

        // อัปเดตส่วนลด
        setDiscount(discount);

        // คำนวณราคาหลังหักส่วนลด
        const netPrice = totalPrice - discount;

        // อัปเดตราคาหลังหักส่วนลด
        setNetPrice(netPrice);

        console.log('Total Price:', totalPrice);
        console.log('Unique Books Price:', uniqueBooksPrice);
        console.log('Discount Rate:', discountRate);
        console.log('Discount:', discount);
        console.log('Net Price:', netPrice);
    };



    // Add book to cart
    const handleAddToCart = async (bookId, amountToAdd) => {
        try {
            const data = await addToCart(bookId, amountToAdd);
            setCart(data.cart);  // อัปเดตตะกร้า
            calculateDiscount(data.cart.items)
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
            setCart(prevCart => {
                const updatedCart = prevCart.items.filter(item => item.book._id !== bookId);
                calculateDiscount(updatedCart);
                return { ...prevCart, items: updatedCart };
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Remove all from cart
    const handleClearCart = async () => {
        try {
            await clearCart();
            setCart({items: []}); // clear state
            setDiscount(0);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <CartContext.Provider value={{
            totalItems,
            cart,
            loading,
            discount,
            handleAddToCart,
            handleUpdateCart,
            handleRemoveFromCart ,
            handleClearCart,
            calculateDiscount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider