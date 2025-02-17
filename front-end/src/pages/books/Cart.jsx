import {useContext} from "react";
import {CartContext} from "../../contexts/CartContext.jsx";


const Cart = () => {
    const {cart, handleAddToCart, handleRemoveFromCart, handleClearCart} = useContext(CartContext);

    // Check cart structure
    const cartBooks = Array.isArray(cart?.items)? cart.items : []  // Use cart.items if has data
    console.log("Cart Books:", cartBooks)

    // Calculate all price
    const calculateTotal = () => {
        return cartBooks.reduce((total, book) => total + (Number(book.book.price) * Number(book.amountInCart) || 0), 0).toFixed(2);
    }

    return (
        <section className="card">
            <h1 className="title">Shopping Cart</h1>

            {cartBooks.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
            ) : (
                <table className="w-full table-fixed">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Book</th>
                        <th className="border border-gray-300 p-2">Price</th>
                        <th className="border border-gray-300 p-2">Quantity</th>
                        <th className="border border-gray-300 p-2">Total</th>
                        <th className="border border-gray-300 p-2">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartBooks.map((book, index) => (
                        <tr key={book._id || book.bookId || index}>
                            <td className="p-2">{book.book.title}</td>
                            <td className="p-2">฿{Number(book.book.price) || 0}</td>
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-2  p-2 rounded">
                                    <button className="cursor-pointer"
                                            onClick={() => {
                                                if (book.amountInCart > 1) {
                                                    handleAddToCart(book._id || book.bookId, -1);
                                                } else {
                                                    handleRemoveFromCart(book._id || book.bookId);
                                                }
                                            }}>
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <span>{Number(book.amountInCart) || 1}</span>
                                    <button className="cursor-pointer" onClick={() => handleAddToCart(book._id || book.bookId, 1)}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="text-center">฿{(Number(book.book.price) * Number(book.amountInCart) || 0).toFixed(2)}</td>
                            <td className="text-center">
                                <button className="text-red-500 hover:bg-red-200 cursor-pointer" onClick={() => handleRemoveFromCart(book._id || book.bookId)}>
                                    <i className="fa-solid fa-trash-can"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {cartBooks.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <span className="font-bold">Total: ฿{calculateTotal()}</span>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                        onClick={handleClearCart}>

                        Clear Cart
                    </button>
                </div>
            )}

        </section>
    )
}


export default Cart