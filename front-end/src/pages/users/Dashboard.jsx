import {useContext, useEffect, useState} from "react";
import {deleteBook, getUserBooks} from "../../Controllers/booksController.js";
import {UserContext} from "../../contexts/UserContext.jsx";
import Book from "../../Components/Book.jsx";
import {Link} from "react-router-dom";
import Alert from "../../Components/Alert.jsx";
import Success from "../../Components/Success.jsx";

const Dashboard = () => {

    // Use user context
    const {user, setUser} = useContext(UserContext)

    // Loading state
    const [loading, setLoading] = useState(true)

    // Error state
    const [ error, setError ] = useState(null);

    // Success state
    const [ success, setSuccess ] = useState(null);

    useEffect(() => {
        setTimeout(async () => {
            //  Grab user's books
            const {userBooks, email} = await getUserBooks();
            // Update user state
            setUser({email, books: userBooks})
            // Remove the loading
            setLoading(false);
        }, 500)
    }, [])

    // Handle delete books
    const handleDelete = async (_id) => {

        if (confirm("Confirm Delete?")) {
            try {
                // Delete the book
                const data = await deleteBook(_id);
                setSuccess(data.success)
            } catch (error) {
                setError(error.message)
            }
        }

        // Will update immediately when Delete book with not waiting for refresh
        const newBooks = user.books.filter((book) => book._id !== _id)
        setUser({...user, books: newBooks})
    }


    return (
        <section className="card">
            <p>{user.email}</p>
            <h1 className="title">User Dashboard</h1>

            {loading && (
                <p className="animate-spin text-3xl text-center block"><i className="fa-solid fa-spinner" /></p>
            )}

            { success && <Success msg={success} /> }
            { error && <Alert msg={error} />}

            {user.books && user.books.map(book => (
                <div key={book._id}>
                    <Book book={book}>
                        <div className="flex items-center gap-2">
                            <Link
                                className="nav-link text-green-500 hover:bg-green-200"
                                title="Update Book"
                                state={{ book }}
                                to="/update"
                            >
                                <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                            <button className="nav-link text-red-500 hover:bg-red-200"
                                    title="Delete Book"
                                    onClick={() => handleDelete(book._id)}
                            >
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </Book>
                </div>
            ))}
        </section>
    )
}

export default Dashboard;