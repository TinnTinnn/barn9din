import {useContext} from "react";
import {CartContext} from "../../contexts/CartContext.jsx";
import Book from "../../Components/Book.jsx";

const Cart = () => {
    const {cart, removeFromCart, addToCart, removeAllFromCart} = useContext(CartContext);

    // Calculate all price
    const calculateTotal = () => {
        return cart.reduce((total, book) => total + book.price * book.amount, 0).toFixed(2);
    }

    return (
        <section className="card">
            <h1 className="title">Shopping Cart</h1>

            {cart.length === 0 ? (
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
                    {cart.map((book) => (
                        <tr key={book._id}>
                            <td className="p-2">{book.title}</td>
                            <td className="p-2">฿{book.price}</td>
                            <td className="p-2 text-center">
                                <div className="flex items-center justify-center gap-2  p-2 rounded">
                                    <button className="cursor-pointer" onClick={() => addToCart(book, false, true)}>
                                        <i className="fa-solid fa-minus"></i>
                                    </button>
                                    <span>{book.amount}</span>
                                    <button className="cursor-pointer" onClick={() => addToCart(book, true)}>
                                        <i className="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </td>
                            <td className="text-center">฿{(book.price * book.amount).toFixed(2)}</td>
                            <td className="text-center">
                                <button className="text-red-500 hover:bg-red-200 cursor-pointer" onClick={() => removeFromCart(book._id)}>
                                    <i className="fa-solid fa-trash-can"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {cart.length > 0 && (
                <div className="mt-4 flex justify-between">
                    <span className="font-bold">Total: ฿{calculateTotal()}</span>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
                        onClick={removeAllFromCart}>

                        Clear Cart
                    </button>
                </div>
            )}

        </section>
    )
}


export default Cart