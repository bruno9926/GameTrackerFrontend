import { Navigate, Outlet } from "react-router";
import  { publicRoutes } from "./routes";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? <Outlet/> : <Navigate to={publicRoutes.LOGIN}/>
    )
}

export default PrivateRoute