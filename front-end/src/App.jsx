import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/users/Login.jsx";
import Register from "./pages/users/Register.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
import Home from "./pages/books/Home.jsx";
import Create from "./pages/books/Create.jsx";
import Update from "./pages/books/Update.jsx";
import AuthRoutes from "./Routes/AuthRoutes.jsx";
import GuestRoutes from "./Routes/GuestRoutes.jsx";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>

                <Route element={<AuthRoutes/>}>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="create" element={<Create/>}/>
                    <Route path="update" element={<Update/>}/>
                </Route>

                <Route element={<GuestRoutes/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>

            </Route>
        </Routes>
    </BrowserRouter>;
}

export default App