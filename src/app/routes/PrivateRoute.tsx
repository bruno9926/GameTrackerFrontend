import { Navigate, Outlet, useLocation } from "react-router";
import  { publicRoutes } from "./routes";
import useAuth from "@features/auth/hooks/useAuth";

const PrivateRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        isAuthenticated ? <Outlet/> : <Navigate to={publicRoutes.LOGIN} state={{ from: location }} replace/>
    )
}

export default PrivateRoute