import {Link, Outlet, useNavigate} from "react-router-dom";
import {useContext,} from "react";
import {UserContext} from "../contexts/UserContext.jsx";

const Layout = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext)

    const handleLogout = () => {
        if (confirm("Confirm Logout?")) {
            // Reset the User state
            setUser({email: null, books: []});
            // Remove the items from local storage
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            // Navigate to Home page
            navigate("/");
        }
    }

    console.log("👤 User Data:", user);


    return <>
        <header className="bg-indigo-500 text-white">
            <nav className="flex items-center justify-between p-4">
                <Link
                    title="Home"
                    to="/"
                    className="nav-link"
                >
                    <i className="fa-solid fa-house text-lg"></i>
                </Link>

                {user.email ? (
                    <div className="flex items-center gap-2">
                        <Link
                            title="Create Book"
                            to="/create"
                            className="nav-link"
                        ><i className="fa-solid fa-plus text-lg"></i></Link>
                        <Link
                            title="Dashboard"
                            to="/dashboard"
                            className="nav-link"
                        > <i className="fa-solid fa-chart-simple text-lg"></i></Link>
                        <button
                            title="Logout"
                            onClick={handleLogout}
                            className="nav-link"
                        > <i className="fa-solid fa-power-off "></i></button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link
                            title="Login"
                            to="/login"
                            className="nav-link"
                        > <i className="fa-solid fa-right-to-bracket text-lg"></i></Link>
                        <Link
                            title="Register"
                            to="/register"
                            className="nav-link"
                        > <i className="fa-solid fa-user-plus text-lg"></i></Link>
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