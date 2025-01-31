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

    if (!state) {
        return <p>No book data found!</p>
    }


    // Form data state
    const [title, setTitle] = useState(state.title);
    const [writer, setWriter] = useState(state.writer);


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Update a new book
            const data = await updateBook(state._id, title, writer);
            console.log("Update Response: ", data);

            // Update the books stats
            const updatedBooks = books.map((book) =>
                book._id === state._id ? {...book, title, writer} : book
            )

            setBooks(updatedBooks)

            // Navigate to dashboard
            navigate('/dashboard');
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

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