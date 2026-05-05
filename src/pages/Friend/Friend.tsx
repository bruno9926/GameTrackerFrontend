import { useParams, Link, useNavigate } from "react-router";
import { RiArrowLeftLine } from "react-icons/ri";
import AnimatedRoute from "../AnimatedRoute";
import UserAvatar from "@features/friends/ui/UserAvatar/UserAvatar";
import { useFriends } from "@features/friends/hook/useFriends";
import { useFriend } from "@features/friends/hook/useFriend";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { Skeleton } from "@shared/ui/chadcn/skeleton";
import { userRoutes } from "@routes/routes";
import type { Friend as FriendType } from "@features/user/model/Friend";
import Button from "@shared/ui/Atoms/Button/Button";
import { IoPersonRemoveSharp } from "react-icons/io5";



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

        {loading && <FriendSkeleton />}

        {!loading && error && <ErrorMessage message={error} retryAction={fetchFriend} />}

        {!loading && !error && !friend && <NotFound />}

        {!loading && !error && friend && <FriendProfile friend={friend} onRemove={handleRemoveFriend} />}
      </div>
    </AnimatedRoute>
  );
};

const FriendProfile = ({ friend, onRemove }: { friend: FriendType; onRemove: () => void }) => {
  const { name, username, avatarUrl, status } = friend;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
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
      </div>
      {/* actions */}
      <Button variant="secondary" onClick={onRemove} className="flex items-center gap-2">
        <IoPersonRemoveSharp />
        Remove friend
      </Button>
      <section className="mt-10">
        <h2>{name}'s Games</h2>

      </section>

    </section>
  );
};

const FriendSkeleton = () => (
  <section className="flex flex-col gap-6">
    <div className="flex sm:flex-row flex-col items-center sm:items-start gap-5 card">
      <Skeleton className="rounded-xl w-24 aspect-square" />
      <div className="flex flex-col flex-1 gap-2 w-full">
        <Skeleton className="w-48 h-8" />
        <Skeleton className="w-24 h-5" />
        <Skeleton className="w-40 h-4" />
      </div>
    </div>
    <Skeleton className="w-full h-20" />
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
