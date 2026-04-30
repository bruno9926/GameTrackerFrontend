import AnimatedRoute from "../AnimatedRoute";
import FriendCodeCard from "@features/friends/ui/FriendCodeCard/FriendCodeCard";
import FriendsList from "@features/friends/ui/FriendsList/FriendsList";

const Friends = () => {
  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-4 page-padding header-safe-area">
        <h1 className="md:hidden mb-1 font-bold text-title text-4xl">Friends</h1>
        <FriendCodeCard code="GT4X-K29R" />
        <FriendsList />
      </div>
    </AnimatedRoute>
  );
};

export default Friends;
