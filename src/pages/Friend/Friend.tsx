import { useParams, Link } from "react-router";
import { BsJoystick } from "react-icons/bs";
import { RiArrowLeftLine } from "react-icons/ri";
import AnimatedRoute from "../AnimatedRoute";
import UserAvatar from "@features/friends/ui/UserAvatar/UserAvatar";
import { useFriends } from "@features/friends/hook/useFriends";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import { Skeleton } from "@shared/ui/chadcn/skeleton";
import { userRoutes } from "@routes/routes";
import type { Friend as FriendType } from "@features/user/model/Friend";

const statusLabel: Record<FriendType["status"], string> = {
  online: "Online",
  busy: "Busy",
  offline: "Offline",
};

const Friend = () => {
  const { id } = useParams<{ id: string }>();
  const { friends, loading, error, fetchFriends } = useFriends();

  const friend = friends.find(f => f.id === id);

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

        {!loading && error && <ErrorMessage message={error} retryAction={fetchFriends} />}

        {!loading && !error && !friend && <NotFound />}

        {!loading && !error && friend && <FriendProfile friend={friend} />}
      </div>
    </AnimatedRoute>
  );
};

const FriendProfile = ({ friend }: { friend: FriendType }) => {
  const { name, username, avatarUrl, friendCode, status } = friend;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex sm:flex-row flex-col items-center sm:items-start gap-5 card">

        <UserAvatar name={name} avatarUrl={avatarUrl} size="lg"/>

        <div className="flex flex-col flex-1 gap-2 min-w-0 sm:text-left text-center">
          <div className="flex sm:flex-row flex-col items-center sm:items-baseline gap-2">
            <h1 className="text-3xl">{name}</h1>
            <span className="text-subtitle truncate">@{username}</span>
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-2">
            <span className={`badge ${status === "online" ? "border-online text-online bg-online/10" : status === "busy" ? "border-busy text-busy bg-busy/10" : "border-offline text-offline bg-offline/10"}`}>
              {statusLabel[status]}
            </span>
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-2 text-subtitle">
            <BsJoystick />
            <span className="text-sm">Playing League of Legends</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center card">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-subtitle text-xxs uppercase">Friend code</span>
          <span className="font-bold text-title text-xl">{friendCode ?? "—"}</span>
        </div>
      </div>
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
