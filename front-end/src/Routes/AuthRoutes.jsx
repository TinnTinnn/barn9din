import {useContext} from "react";
import {UserContext} from "../contexts/UserContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

const AuthRoutes = () => {
    const { user } = useContext(UserContext)

    return user.email ? <Outlet /> : <Navigate to="/login" />
}

export default AuthRoutes;