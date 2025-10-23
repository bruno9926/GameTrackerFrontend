import MainLayout from "./layout/MainLayout";
// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Games from "./pages/Games/Games";
import Platforms from "./pages/Platforms/Platforms";
import Settings from "./pages/Settings/Settings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "./styles/main.scss";
import type React from "react";

enum RoutePaths {
  DASHBOARD = "/dashboard",
  GAMES = "/games",
  PLATFORMS = "/platforms",
  SETTINGS = "/settings",
}

const routing: Record<RoutePaths, React.ReactNode> = {
  [RoutePaths.DASHBOARD]: <Dashboard />,
  [RoutePaths.GAMES]: <Games />,
  [RoutePaths.PLATFORMS]: <Platforms />,
  [RoutePaths.SETTINGS]: <Settings />,
};

const defaultRoute = RoutePaths.DASHBOARD;

function App() {
  return (
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
  );
}

export default App;
