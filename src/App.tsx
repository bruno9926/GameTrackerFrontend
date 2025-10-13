import MainLayout from "./layout/MainLayout";
// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Games from "./pages/Games/Games";
import Platforms from "./pages/Platforms/Platforms";
import Settings from "./pages/Settings/Settings";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "./styles/main.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/games" element={<Games />} />
          <Route path="/platforms" element={<Platforms />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
