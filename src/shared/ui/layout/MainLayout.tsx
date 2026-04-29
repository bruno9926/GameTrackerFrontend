import Header from "@shared/ui/Header/Header";
import Navigation from "@shared/ui/Navigation/Navigation";
import { Outlet } from "react-router";
import ButtonBar from "@shared/ui/ButtonBar/ButtonBar";

function MainLayout() {
  return (
    <main className="app-layout">
      <Navigation />
      <Header />
      <div className="pb-16 md:pb-0 main-content">
        <Outlet />
      </div>
      <ButtonBar />
    </main>
  );
}

export default MainLayout;
