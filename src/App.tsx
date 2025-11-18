import MainLayout from "./layout/MainLayout";
// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Games from "./pages/Games/Games";
import Platforms from "./pages/Platforms/Platforms";
import Settings from "./pages/Settings/Settings";

import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { routes as RoutePaths } from "./routes/routes";
import Providers from "./Providers";
import type React from "react";
import "./styles/main.scss";

type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];

const routing: Record<RoutePath, React.ReactNode> = {
  [RoutePaths.DASHBOARD]: <Dashboard />,
  [RoutePaths.GAMES]: <Games />,
  [RoutePaths.PLATFORMS]: <Platforms />,
  [RoutePaths.SETTINGS]: <Settings />,
};

const defaultRoute = RoutePaths.DASHBOARD;

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to={defaultRoute} replace />} />
            {Object.entries(routing).map(([path, element]) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
