import {useContext, useState} from "react";
import { updateBook} from "../../Controllers/booksController.js";
import Alert from "../../Components/Alert.jsx";

import {useLocation, useNavigate} from "react-router-dom";
import {BookContext} from "../../contexts/BookContext.jsx";

const Update = () => {

    // Use book context
    const { books, setBooks } = useContext(BookContext);

    // Error state
    const [error, setError] = useState(null);

    // Use navigate hook
    const navigate = useNavigate()
    const {state} = useLocation();

    // Form data state
    const [title, setTitle] = useState(state?.book?.title || '');
    const [writer, setWriter] = useState(state?.book?.writer || '');

    if (!state || !state.book) {
        return <p>No book data found!</p>;
    }


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Update the book
            const data = await updateBook(state.book._id, title, writer);
            console.log("Update Response:", data);

            // Update the books state
            const updatedBooks = books.map((book) =>
                book._id === state.book._id ? { ...book, title, writer } : book
            );
            setBooks(updatedBooks);

            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }
    };

    return <section className="card">
        <h1 className="title">Update Your Book</h1>

        { state ? (
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Book Title"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
                <input
                    type="text"
                    placeholder="Writer"
                    className="input"
                    value={writer}
                    onChange={(e) => setWriter(e.target.value)}
                />
                <button className ="btn">Update</button>
            </form>
        ) : (
            <p>No book data found!</p>
        )}

        {error && <Alert msg={error}/>}

    </section>
}

export default Update;