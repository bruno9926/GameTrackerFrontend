import { useParams, Link, useNavigate } from "react-router";
import { RiArrowLeftLine } from "react-icons/ri";
import AnimatedRoute from "../AnimatedRoute";
import { useFriends } from "@features/friends/hook/useFriends";
import { useFriend } from "@features/friends/hook/useFriend";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { userRoutes } from "@routes/routes";
import FriendProfile from "@features/friends/ui/FriendProfile/FriendProfile";
import FriendGames from "@features/friends/ui/FriendGames/FriendGames";
import { UserAvatarSkeleton } from "@features/friends/ui/UserAvatar/UserAvatar";
import { Skeleton } from "@shared/ui/chadcn/skeleton";
import { GameItemSkeleton } from "@features/games/ui/GameList/GameCard";

const Friend = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { removeFriend } = useFriends();
  const { friend, loading, error, fetchFriend, gamesInCommon } = useFriend(id);

  const handleRemoveFriend = async () => {
    if (!id) return;
    await removeFriend(id);
    navigate(userRoutes.FRIENDS);
  };

  const renderContent = () => {
    if (loading) return <FriendSkeleton />;
    if (error) return <ErrorMessage message={error} retryAction={fetchFriend} />;
    if (!friend) return <NotFound />;

    return (
      <section className="flex flex-col gap-6">
        <FriendProfile friend={friend} onRemove={handleRemoveFriend} />
        <FriendGames friend={friend} gamesInCommon={gamesInCommon} />
      </section>
    );
  };

  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-6 desktop-x-padding page-padding header-safe-area">
        <Link
          to={userRoutes.FRIENDS}
          className="flex items-center gap-2 w-fit text-subtitle hover:text-title transition-colors"
        >
          <RiArrowLeftLine size={18} />
          <span className="text-sm">Back to friends</span>
        </Link>

        {renderContent()}
      </div>
    </AnimatedRoute>
  );
};

const FriendSkeleton = () => (
  <section className="flex flex-col gap-6">
    {/* profile */}
    <div className="flex flex-row items-center gap-5">
      <UserAvatarSkeleton size="lg" className="hidden md:block" />
      <UserAvatarSkeleton size="md" className="md:hidden block" />
      <div className="flex flex-col gap-2">
        <Skeleton className="w-40 h-8" />
        <Skeleton className="w-24 h-5" />
      </div>
    </div>
    <Skeleton className="rounded-xl w-40 h-10" />
    {/* games */}
    <div className="mt-10">
      <Skeleton className="mb-6 w-56 h-7" />
      <div className="games-grid">
        {Array.from({ length: 5 }).map((_, i) => (
          <GameItemSkeleton key={i} />
        ))}
      </div>
    </div>
  </section>
);

const NotFound = () => (
  <div className="empty-box">
    <span className="opacity-80 mb-2 text-2xl">🕵️</span>
    <p className="font-medium text-subtitle text-base text-center">Friend not found</p>
    <p className="mt-1 text-subtitle text-xs">They may have removed you, or the link is invalid</p>
  </div>
);

export default Friend;
