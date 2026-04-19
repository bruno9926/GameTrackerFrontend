import GameList from "@features/games/ui/GameList/GameList";
import Friends from "@shared/ui/Friends/Friends";
import GOTW from "../../shared/ui/GOTW/GOTW";
import AnimatedRoute from "../AnimatedRoute";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <AnimatedRoute>
      <GOTW />
      <div className="gap-10 md:gap-3 grid grid-cols-1 md:grid-cols-7 p-4">
        <div className="col-span-1 md:col-span-5">
          <GameList />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Friends />
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Dashboard;
