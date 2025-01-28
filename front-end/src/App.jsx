import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Login from "./pages/users/Login.jsx";
import Register from "./pages/users/Register.jsx";
import Dashboard from "./pages/users/Dashboard.jsx";
import Home from "./pages/books/Home.jsx";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}/>

                <Route path="login" element={<Login/>}/>
                <Route path="register" element={<Register/>}/>
                <Route path="dashboard" element={<Dashboard/>}/>
            </Route>
        </Routes>
    </BrowserRouter>;
}

export default App