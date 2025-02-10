import {Link, Outlet, useNavigate} from "react-router-dom";
import {useContext,} from "react";
import {UserContext} from "../contexts/UserContext.jsx";
import {CartContext} from "../contexts/CartContext.jsx";

const Layout = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)

    const { cart } = useContext(CartContext)

    const handleLogout = () => {
        if (confirm("Confirm Logout?")) {
            // Reset the User state
            setUser({email: null, books: []});
            // Remove the items from local storage
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            // Navigate to Home page
            navigate("/");
        }
    }

    console.log("👤 User Data:", user);
    console.log("👤 User Role:", user.role);


    return <>
        <header className="bg-indigo-500 text-white">
            <nav className="flex items-center justify-between p-4">
                <Link title="Home" to="/" className="nav-link">
                    <i className="fa-solid fa-house text-lg"></i>
                </Link>

                {user.email ? (
                    <div className="flex items-center gap-2">
                        {/* Show Create and Dashboard buttons only for Admin */}
                        {user.role === "admin" && (
                            <>
                                <Link
                                    title="Create Book"
                                    to="/create"
                                    className="nav-link"
                                >
                                    <i className="fa-solid fa-plus text-lg"></i>
                                </Link>
                                <Link
                                    title="Dashboard"
                                    to="/dashboard"
                                    className="nav-link"
                                >
                                    <i className="fa-solid fa-chart-simple text-lg"></i>
                                </Link>
                            </>
                        )}

                        {/* Show Cart button only for User */}
                        {user.role === "user" && (
                            <Link title="Cart" to="/cart" className="nav-link">
                                <i className="fa-solid fa-cart-shopping text-lg"></i>
                                {cart?.length > 0 && (
                                    <span className="text-xs bg-red-500 text-white rounded-full px-2 ml-1">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {/* Show Logout button for both User and Admin */}
                        <button
                            title="Logout"
                            onClick={handleLogout}
                            className="nav-link"
                        >
                            <i className="fa-solid fa-power-off"></i>
                        </button>
                    </div>
                ) : (
                    // Show Login and Register buttons if not logged in
                    <div className="flex items-center gap-2">
                        <Link
                            title="Login"
                            to="/login"
                            className="nav-link"
                        >
                            <i className="fa-solid fa-right-to-bracket text-lg"></i>
                        </Link>
                        <Link
                            title="Register"
                            to="/register"
                            className="nav-link"
                        >
                            <i className="fa-solid fa-user-plus text-lg"></i>
                        </Link>
                    </div>
                )}
            </nav>
        </header>

        <main className="p-4">
            <Outlet/>
        </main>
    </>
}

/************************  To do *************************/
/************************
 1. When login success  navigate to dashboard. the link for login and Register button could disappear
 2. Now when login success and need to interact with create, dashboard, logout button User have to click Home icon.
 that is not we want. because we want to direct to dashboard page and all that icon could show.  but now
 you must go to the home page to visit all icon that you want

 *************************/

export default Layout