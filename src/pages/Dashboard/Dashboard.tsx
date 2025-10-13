import GameList from "../../components/GameList/GameList";
import Friends from "../../components/Friends/Friends";
import GOTW from "../../components/GOTW/GOTW";
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
