import Header from "@shared/ui/Header/Header";
import Navigation from "@shared/ui/Navigation/Navigation";
import { Outlet } from "react-router";

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
