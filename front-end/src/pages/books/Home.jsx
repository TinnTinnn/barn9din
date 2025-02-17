import {useContext, useEffect, useState,} from "react";
import {getBooks} from "../../Controllers/booksController.js";
import {BookContext} from "../../contexts/BookContext.jsx";
import Book from "../../Components/Book.jsx";
import {Link} from "react-router-dom";
import {CartContext} from "../../contexts/CartContext.jsx";
import Success from "../../Components/Success.jsx";
import Alert from "../../Components/Alert.jsx";
import {UserContext} from "../../contexts/UserContext.jsx";



const Home = () => {
    // Use book context
    const { books, setBooks } = useContext(BookContext)
    const { cart, handleAddToCart, handleUpdateCart } = useContext(CartContext);
    const { user } = useContext(UserContext)

    // Loading state
    const [ loading, setLoading ] = useState(true)

    // Success & Error state
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    // Local state for amountInCart
    const [amountInCart, setAmountInCart] = useState({});

    // Grab all the books on page load
    useEffect(() => {
        setTimeout(async () => {
            // Grab all books
            const data = await getBooks();
            // Check data
            console.log("Data from API:", data);
            // Update books state
            setBooks(data.books);
            //  Remove the loading
            setLoading(false);

            // Check data
            if (data && data.books) {
                setBooks(data.books);
            } else {
                console.error("Not found books in response:", data);
            }
        }, 1000);
    }, []);

    // Add book to cart
    const handleCartClick = async (book) => {

       try {
           const bookId = book._id;
           const amount = amountInCart[bookId] || 1

           // Call handleAddToCart
           await handleAddToCart(bookId, amount);

           // Show Notification
           setSuccess("The book has been added successfully.");
           setTimeout(() => setSuccess(null), 2000)
       } catch (error) {
           console.error("Error adding to cart:", error);
           setError("Failed to add to cart");
           setTimeout(() => setError(null), 2000)
       }
    }

    // handle amount change
    const handleAmountChange = (book, action) => {
      const currentAmount = amountInCart[book._id] || 1;
      const newAmount = action === "increase" ? currentAmount + 1 : currentAmount -1

        if (newAmount >= 1 && newAmount <= book.amount) { // Ensure it's within stock limits
            setAmountInCart(prev => ({
                ...prev,
                [book._id]: newAmount // Update the amount in the local state
            }));
        }
    }


    return (
        <section className="card">
            <h1 className="title">Latest Books</h1>

            {loading && (
                <p className="animate-spin text-3xl text-center block"><i className="fa-solid fa-spinner" /></p>
            )}

            {/* Notifications */}
            {success && <Success msg={success} />}
            {error && <Alert msg={error} />}

            {books && books.map((book) => <div key={book._id}>
                <Book book={book}>
                    <div className="flex items-center gap-2">

                        {/* Quantity adjustment and Add to Cart */}
                        {user.role === "user" && (
                            <div className="flex items-center gap-2">
                                <button
                                    className="text-gray-700 hover:bg-gray-200 px-2 py-1 rounded"
                                    onClick={() => handleAmountChange(book, "decrease")}
                                >
                                    <i className="fa-solid fa-minus"></i>
                                </button>
                                <span>{amountInCart[book._id] || 1}</span>
                                <button
                                    className="text-gray-700 hover:bg-gray-200 px-2 py-1 rounded"
                                    onClick={() => handleAmountChange(book, "increase")}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                                <Link
                                    className="nav-link text-green-500 hover:bg-green-200"
                                    title="Add To Cart"
                                    onClick={() => handleCartClick(book)}
                                >
                                    <i className="fa-solid fa-cart-plus"></i>
                                </Link>
                            </div>
                        )}
                    </div>
                </Book>
            </div>)}
        </section>
    )
}

export default Home;