import {useContext, useEffect, useState} from "react";
import {getUserBooks} from "../../Controllers/booksController.js";
import {UserContext} from "../../contexts/UserContext.jsx";
import Book from "../../Components/Book.jsx";
import {Link} from "react-router-dom";

const Dashboard = () => {

    // Use user context
    const {user, setUser} = useContext(UserContext)

    // Loading state
    const [loading, setLoading] = useState(true)

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
    const handleDelete = async (id) => {
        console.log(id)
    }


    return (
        <section className="card">
            <h1 className="title">User Dashboard</h1>

            {loading && (
                <p className="animate-spin text-3xl text-center block"><i className="fa-solid fa-spinner" /></p>
            )}

            {user.books && user.books.map(book => (
                <div key={book._id}>
                    <Book book={book}>
                        <div className="flex items-center gap-2">
                            <Link
                                className="nav-link text-green-500 hover:bg-green-200"
                                title="Update Book"
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