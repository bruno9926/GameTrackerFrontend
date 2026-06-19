import RecentGamesWidget from "@features/games/ui/RecentGamesWidget/RecentGamesWidget";
import OnlineFriendsWidget from "@features/friends/ui/OnlineFriendsWidget";
import GOTW from "@features/games/ui/GOTW/GOTW";
import AnimatedRoute from "../AnimatedRoute";
import { anim } from "@shared/ui/Animations";
import Staticstics from "@/features/games/ui/Staticstics/Statictics";

const Dashboard = () => {
  return (
    <AnimatedRoute>
      <GOTW />
      <div className="gap-10 md:gap-7 grid grid-cols-1 md:grid-cols-7 page-padding pt-0">
        <anim.FadeInUp className="col-span-1 md:col-span-7 w-full">
          <Staticstics />
        </anim.FadeInUp>
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
