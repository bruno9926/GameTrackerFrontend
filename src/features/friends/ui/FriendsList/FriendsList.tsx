import type React from "react";
import FriendItem, { FriendListItemSkeleton } from "../FriendItem";
import { useFriends } from "../../hook/useFriends";
import type { Friend } from "@features/user/model/Friend";

const FriendsList = () => {
  const { friends, onlineFriends, busyFriends, offlineFriends, loading, error } = useFriends();

  if (loading) return (
    <div className="flex flex-col gap-3 mt-3">
      {Array.from({ length: 3 }).map((_, i) => <FriendListItemSkeleton key={i} />)}
    </div>
  );

  if (error) return (
    <div className="p-2 text-destructive text-xs">{error}</div>
  );

  if (friends.length === 0) return <EmptyFriendsList />;

  return (
    <div className="flex flex-col gap-6 mt-3">
      <FriendsGroup title={<span className="text-online">Online · {onlineFriends.length}</span>} friends={onlineFriends} />
      <FriendsGroup title={<span className="text-busy">Busy · {busyFriends.length}</span>} friends={busyFriends} />
      <FriendsGroup title={<span className="text-offline">Offline · {offlineFriends.length}</span>} friends={offlineFriends} />
    </div>
  );
};

const FriendsGroup = ({ title, friends }: { title: React.ReactNode; friends: Friend[] }) => {
  if (friends.length === 0) return null;

  return (
    <div className="flex flex-col gap-1">
      <h3 className="mb-1 font-semibold text-xs uppercase">{title}</h3>
      {friends.map(({ id, ...data }) => (
        <FriendItem key={id} {...data} />
      ))}
    </div>
  );
};

const EmptyFriendsList = () => (
  <div className="flex flex-col justify-center items-center px-4 py-8 border-2 border-border border-dashed rounded-xl">
    <span className="opacity-80 mb-2 text-2xl">👻</span>
    <p className="font-medium text-subtitle text-base text-center">Boo... no one around</p>
    <p className="mt-1 text-subtitle text-xs">Add a friend using their code above</p>
  </div>
);

export default FriendsList;
