import {useContext, useEffect,} from "react";
import {getBooks} from "../../Controllers/booksController.js";
import {BookContext} from "../../contexts/BookContext.jsx";
import Book from "../../Components/Book.jsx";



const Home = () => {
    // Use book context
    const { books, setBooks } = useContext(BookContext)

    // Grab all the books on page load
    useEffect(() => {
        setTimeout(async () => {
            const data = await getBooks();
            console.log("📚 Data from API:", data);
            setBooks(data.books);

            // Check data
            if (data && data.books) {
                setBooks(data.books);
            } else {
                console.error("❌ ไม่มี books ใน response:", data);
            }
        });
    }, []);


    return (
        <section className="card">
            <h1 className="title">Latest Books</h1>

            {books && books.map((book) => <div key={book._id}>
                <Book book={book} />
            </div>)}
        </section>
    )
}

export default Home;