import { useParams, Link, useNavigate } from "react-router";
import { RiArrowLeftLine } from "react-icons/ri";
import AnimatedRoute from "../AnimatedRoute";
import UserAvatar, { UserAvatarSkeleton } from "@features/friends/ui/UserAvatar/UserAvatar";
import { useFriends } from "@features/friends/hook/useFriends";
import { useFriend } from "@features/friends/hook/useFriend";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { Skeleton } from "@shared/ui/chadcn/skeleton";
import { userRoutes } from "@routes/routes";
import type { Friend as FriendType } from "@features/user/model/Friend";
import Button from "@shared/ui/Atoms/Button/Button";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { anim } from "@shared/ui/Animations";
import FriendGameItem from "@features/games/ui/GameList/FriendGameItem";
import { GameItemSkeleton } from "@features/games/ui/GameList/GameCard";



const Friend = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { removeFriend } = useFriends();
  const { friend, loading, error, fetchFriend } = useFriend(id);

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
        <FriendGames friend={friend} />
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

const FriendProfile = ({ friend, onRemove }: { friend: FriendType; onRemove: () => void }) => {
  const { name, username, avatarUrl } = friend;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-5">
        <UserAvatar name={name} avatarUrl={avatarUrl} size="lg" status={'busy'} className="hidden md:block" />
        <UserAvatar name={name} avatarUrl={avatarUrl} size="md" status={'busy'} className="md:hidden block" />

        <div className="flex flex-col flex-1 gap-2 min-w-0 h-full">
          <div className="flex flex-col items-start gap-0">
            <h1 className="text-3xl">{name}</h1>
            <span className="text-subtitle truncate">@{username}</span>
          </div>
        </div>
      </div>
      {/* actions */}
      <Button variant="secondary" onClick={onRemove} className="flex items-center gap-2">
        <IoPersonRemoveSharp />
        Remove friend
      </Button>
    </div>
  );
};

const FriendGames = ({ friend }: { friend: FriendType }) => {
  const firstName = friend.name.split(' ')[0];

  return (
    <section className="mt-10">
      <h2>Games {firstName} is tracking</h2>

      <div className="mt-6">
        {friend.games && friend.games.length > 0 ? (
          <anim.FadeInUp className="games-grid">
            {friend.games.map((game) =>
              <FriendGameItem key={game.id} {...game} />
            )}
          </anim.FadeInUp>
        ) : (
          <div className="empty-box">
            <span className="opacity-80 mb-2 text-2xl">🎮</span>
            <p className="font-medium text-subtitle text-base text-center">{firstName} isn't tracking any games yet</p>
            <p className="mt-1 text-subtitle text-xs">Check back later</p>
          </div>
        )}
      </div>
    </section>
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
