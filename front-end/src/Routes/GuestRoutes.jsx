
import {Navigate, Outlet} from "react-router-dom";

const GuestRoutes = () => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to="/" /> : <Outlet/>
}

export default GuestRoutes;