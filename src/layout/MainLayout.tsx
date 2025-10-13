import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";
import { Outlet } from "react-router";

import "../styles/main.scss";

function MainLayout() {
  return (
    <main className="app-layout">
      <Navigation />
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
    </main>
  );
}

export default MainLayout;
