import {useContext, useState} from "react";
import {createBook} from "../../Controllers/booksController.js";
import Alert from "../../Components/Alert.jsx";

import {useNavigate} from "react-router-dom";
import {BookContext} from "../../contexts/BookContext.jsx";

const Create = () => {

    const { books, setBooks } = useContext(BookContext);

    // Error state
    const [error, setError] = useState(null);

    // Form data state
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate()

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            // Create a new book
            const data = await createBook(title, writer, price, amount);
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
        <h1 className="title">Create a new Book</h1>

        <form onSubmit={handleCreate}>
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
            <input
                type="number"
                placeholder="Price"
                className="input"
                value={price}
                min="0"
                onChange={(e) => {
                    const value = Math.max(0, e.target.value);
                    setPrice(value)
                }}
            />
            <input
                type="number"
                placeholder="Amount"
                className="input"
                value={amount}
                min="0"
                onChange={(e) => {
                    const value = Math.max(0, e.target.value);
                    setAmount(value)
                }}
            />
            <button className ="btn">Create</button>
        </form>

        {error && <Alert msg={error}/>}

    </section>
}

export default Create;