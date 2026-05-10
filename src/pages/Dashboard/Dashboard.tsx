import RecentGamesWidget from "@features/games/ui/RecentGamesWidget/RecentGamesWidget";
import OnlineFriendsWidget from "@features/friends/ui/OnlineFriendsWidget";
import GOTW from "@features/games/ui/GOTW/GOTW";
import AnimatedRoute from "../AnimatedRoute";
import { anim } from "@shared/ui/Animations";

const Dashboard = () => {
  return (
    <AnimatedRoute>
      <GOTW />
      <div className="gap-10 md:gap-7 grid grid-cols-1 md:grid-cols-7 page-padding">
        <anim.FadeInUp className="col-span-1 md:col-span-5">
          <RecentGamesWidget />
        </anim.FadeInUp>
        <anim.FadeInUp className="col-span-1 md:col-span-2">
          <OnlineFriendsWidget />
        </anim.FadeInUp>
      </div>
    </AnimatedRoute>
  );
};

export default Dashboard;
