import { Navigate, Outlet } from "react-router";
import  { defaultRoute } from "./routes";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
    const { user } = useAuth();
    const logged = !!user;

    return (
        logged ? <Navigate to={defaultRoute}/> : <Outlet/>
    )
}

export default PublicRoute