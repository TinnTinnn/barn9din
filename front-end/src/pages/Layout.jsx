import {Link, Outlet} from "react-router-dom";

const Layout = () => {

    return <>
        <header className="bg-indigo-500 text-white">
            <nav className="flex items-center justify-between p-4">
                <Link to="/" className="nav-link">
                    <i className="fa-solid fa-house text-lg"></i>
                </Link>

                <div className="flex items-center gap-2">
                    <Link to="/login" className="nav-link">
                        <i className="fa-solid fa-right-to-bracket text-lg"></i>
                    </Link>
                    <Link to="/register" className="nav-link">
                        <i className="fa-solid fa-user-plus text-lg"></i>
                    </Link>
                </div>
            </nav>
        </header>

        <main className="p-4">
            <Outlet/>
        </main>
    </>
}

export default Layout