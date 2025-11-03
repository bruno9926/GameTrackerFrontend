import MainLayout from "./layout/MainLayout";
// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Games from "./pages/Games/Games";
import Platforms from "./pages/Platforms/Platforms";
import Settings from "./pages/Settings/Settings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { routes as RoutePaths } from "./routes/routes";
// providers
import { Toaster } from "./components/Atoms/Toast";
// redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

import "./styles/main.scss";
import type React from "react";

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
    <Provider store={store}>
      <Toaster position="top-center" />
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
    </Provider>
  );
}

export default App;
