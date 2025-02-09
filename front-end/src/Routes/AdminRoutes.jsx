import {Navigate, Outlet} from "react-router-dom";


const AdminRoutes = () => {
    const role = localStorage.getItem("role"); // Grab role from localstorage

    return role === "admin" ? <Outlet/> : <Navigate to="/"/>
}


export default AdminRoutes;