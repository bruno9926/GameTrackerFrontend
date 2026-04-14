import { Navigate, Outlet } from "react-router";
import  { publicRoutes } from "./routes";
import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
    const { user } = useAuth();
    const logged = !!user;

    return (
        logged ? <Outlet/> : <Navigate to={publicRoutes.LOGIN}/>
    )
}

export default PrivateRoute