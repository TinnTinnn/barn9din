import {useContext, useState} from "react";
import { updateBook} from "../../Controllers/booksController.js";
import Alert from "../../Components/Alert.jsx";

import {useLocation, useNavigate} from "react-router-dom";
import {BookContext} from "../../contexts/BookContext.jsx";

const Update = () => {

    // Use book context
    const { books, setBooks } = useContext(BookContext);

    // Use navigate hook
    const navigate = useNavigate()
    const {state} = useLocation();


    // Error state
    const [error, setError] = useState(null);

    // Form data state
    const [title, setTitle] = useState(state.title);
    const [writer, setWriter] = useState(state.writer);


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            // Update a new book
            const data = await updateBook(state._id, title, writer);
            // Update the books stats
            setBooks([...books, data.book])
            // Navigate to dashboard
            navigate('/dashboard');
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }

    return <section className="card">
        <h1 className="title">Update Your Book</h1>

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

        {error && <Alert msg={error}/>}

    </section>
}

export default Update;