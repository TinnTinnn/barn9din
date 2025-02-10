import {useContext, useEffect, useState,} from "react";
import {getBooks} from "../../Controllers/booksController.js";
import {BookContext} from "../../contexts/BookContext.jsx";
import Book from "../../Components/Book.jsx";
import {Link} from "react-router-dom";
import {CartContext} from "../../contexts/CartContext.jsx";



const Home = () => {
    // Use book context
    const { books, setBooks } = useContext(BookContext)
    const { addToCart } = useContext(CartContext);

    // Loading state
    const [ loading, setLoading ] = useState(true)

    // Grab all the books on page load
    useEffect(() => {
        setTimeout(async () => {
            // Grab all books
            const data = await getBooks();
            // Check data
            console.log("📚 Data from API:", data);
            // Update books state
            setBooks(data.books);
            //  Remove the loading
            setLoading(false);

            // Check data
            if (data && data.books) {
                setBooks(data.books);
            } else {
                console.error("❌ Not found books in response:", data);
            }
        }, 1000);
    }, []);


    return (
        <section className="card">
            <h1 className="title">Latest Books</h1>

            {loading && (
                <p className="animate-spin text-3xl text-center block"><i className="fa-solid fa-spinner" /></p>
            )}

            {books && books.map((book) => <div key={book._id}>
                <Book book={book}>
                    <div className="flex items-center gap-2">
                        <Link
                            className="nav-link text-green-500 hover:bg-green-200"
                            title="Add To Cart"
                            onClick={() => {
                                addToCart(book);
                                alert("The book has been added");
                            }}
                        >
                            <i className="fa-solid fa-cart-plus"></i>
                        </Link>
                    </div>
                </Book>
            </div>)}
        </section>
    )
}

export default Home;