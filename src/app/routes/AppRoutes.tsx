import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { defaultRoute, publicRoutes, userRoutes } from "./routes";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import MainLayout from "@shared/ui/layout/MainLayout";
// pages
import Dashboard from "@pages/Dashboard/Dashboard";
import Games from "@features/games/ui/Games/Games";
import Platforms from "@pages/Platforms/Platforms";
import Settings from "@pages/Settings/Settings";
import SignUp from "@pages/SignUp/SignUp";
import SignIn from "@pages/SignIn/SignIn";

// user routes
type UserRoutePath = (typeof userRoutes)[keyof typeof userRoutes];
const userRoutesMap: Record<UserRoutePath, React.ReactNode> = {
    [userRoutes.DASHBOARD]: <Dashboard />,
    [userRoutes.GAMES]: <Games />,
    [userRoutes.PLATFORMS]: <Platforms />,
    [userRoutes.SETTINGS]: <Settings />
};
// public routes
type PublicRoutePath = (typeof publicRoutes)[keyof typeof publicRoutes];
const publicRoutesMap: Record<PublicRoutePath, React.ReactNode> = {
    [publicRoutes.LOGIN]: <SignIn />,
    [publicRoutes.SIGNUP]: <SignUp />
};

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Private routes */}
                <Route element={<PrivateRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
                        {
                            Object.entries(userRoutesMap).map(
                                ([path, element]) => (
                                    <Route key={path} path={path} element={element} />
                                )
                            )
                        }
                    </Route>
                </Route>
                {/* Public routes */}
                <Route element={<PublicRoute />}>
                    {
                        Object.entries(publicRoutesMap).map(
                            ([path, element]) => (
                                <Route key={path} path={path} element={element} />
                            )
                        )
                    }
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes