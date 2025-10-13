import Dashboard from "../pages/Dashboard/Dashboard";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";

import "../styles/main.scss";

function MainLayout() {
  return (
    <main className="app-layout">
      <Navigation />
      <Header />
      <div className="main-content">
        <Dashboard />
      </div>
    </main>
  );
}

export default MainLayout;
