import { Navigate, Outlet } from "react-router";
import  { defaultRoute } from "./routes";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? <Navigate to={defaultRoute}/> : <Outlet/>
    )
}

export default PublicRoute