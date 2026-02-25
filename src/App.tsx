import MainLayout from "./layout/MainLayout";
// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Games from "./pages/Games/Games";
import Platforms from "./pages/Platforms/Platforms";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/LogIn/Login";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { userRoutes, publicRoutes, defaultRoute } from "./routes/routes";
import Providers from "./Providers";
import "./styles/main.scss";

// user routes
type UserRoute = (typeof userRoutes)[keyof typeof userRoutes];
const userRoutesMap: Record<UserRoute, React.ReactNode> = {
  [userRoutes.DASHBOARD]: <Dashboard />,
  [userRoutes.GAMES]: <Games />,
  [userRoutes.PLATFORMS]: <Platforms />,
  [userRoutes.SETTINGS]: <Settings />
};
// public routes
type PublicRoute = (typeof publicRoutes)[keyof typeof publicRoutes];
const publicRoutesMap: Record<PublicRoute, React.ReactNode> = {
  [publicRoutes.LOGIN]: <Login />
};

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
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
          {
            Object.entries(publicRoutesMap).map(
              ([path, element]) => (
                <Route key={path} path={path} element={element} />
              )
            )
          }
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
