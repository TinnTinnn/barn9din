import {useContext} from "react";
import {CartContext} from "../../contexts/CartContext.jsx";


const Cart = () => {
    const {cart, handleAddToCart, handleRemoveFromCart, handleClearCart, discount} = useContext(CartContext);


    // Check cart structure
    const cartBooks = Array.isArray(cart?.items)? cart.items : []  // Use cart.items if has data
    console.log("Cart Books:", cartBooks)

    // Calculate total price
    const calculateTotal = () => {
        return cartBooks.reduce((total, book) => total + (Number(book.book.price) * Number(book.amountInCart) || 0), 0).toFixed(2);
    };
    console.log("Calculate Total:", calculateTotal());

    // Get discount
    const discountAmount = discount // discount from cartItems

    // get discount
    const finalTotal = (calculateTotal() - discountAmount) || 0;


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
                        <th className="border border-gray-300 p-2">Stock</th>
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
                            <td className="p-2">{book.book.amount}</td>
                            <td className="p-2">฿{Number(book.book.price) || 0}</td>
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-2  p-2 rounded">
                                    <button className="cursor-pointer"
                                            onClick={() => {
                                                if (book.amountInCart > 1) {
                                                    handleAddToCart(book.book._id || book.book.bookId, -1);
                                                } else {
                                                    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
                                                    if (confirmDelete) {
                                                        handleRemoveFromCart(book.book._id || book.book.bookId);
                                                    }
                                                }
                                            }}>
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <span>{Number(book.amountInCart) || 1}</span>
                                    <button className="cursor-pointer"  onClick={() => {
                                        if (book.amountInCart >= book.book.amount) {
                                            alert(`Sorry, we don't have enough stock! Only ${book.book.amount} left in stock.`);

                                            return;
                                        }
                                        handleAddToCart(book.book._id || book.book.bookId, 1);
                                    }}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="text-center">฿{(Number(book.book.price) * Number(book.amountInCart) || 0).toFixed(2)}</td>
                            <td className="text-center">
                                <button className="text-red-500 hover:bg-red-200 cursor-pointer" onClick={() => {
                                    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
                                    if (confirmDelete) {
                                        handleRemoveFromCart(book.book._id || book.book.bookId);
                                    }
                                }}
                                >
                                    <i className="fa-solid fa-trash-can"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {cartBooks.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                    <div className="flex justify-between">
                        <span className="text-lg font-bold">Total:</span>
                        <span className="text-lg">฿{calculateTotal()}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-lg font-bold text-green-500">Discount:</span>
                        <span className="text-lg font-bold text-green-500">฿{discountAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between font-bold text-xl">
                        <span>Total Price after Discount:</span>
                        <span className="text-red-500">฿{finalTotal.toFixed(2)}</span>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                            onClick={handleClearCart}>
                            Clear Cart
                        </button>
                    </div>
                </div>

            )}

        </section>
    )
}


export default Cart