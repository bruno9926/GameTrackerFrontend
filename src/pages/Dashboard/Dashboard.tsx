import GameList from "@features/games/ui/GameList/GameList";
import Friends from "@shared/ui/Friends/Friends";
import GOTW from "../../shared/ui/GOTW/GOTW";
import AnimatedRoute from "../AnimatedRoute";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <AnimatedRoute>
      <h1>Gaming Dashboard</h1>
      <p>Welcome to your gaming dashboard!</p>
      <div className="dashboard-tiles">
        <GOTW />
        <GameList />
        <Friends />
      </div>
    </AnimatedRoute>
  );
};

export default Dashboard;
