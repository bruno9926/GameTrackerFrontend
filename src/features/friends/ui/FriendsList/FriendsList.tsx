import type React from "react";
import FriendItem, { FriendListItemSkeleton } from "../FriendItem";
import { useFriends } from "../../hook/useFriends";
import type { Friend } from "@features/user/model/Friend";
import { Skeleton } from "@shared/ui/chadcn/skeleton";

const FriendsGroupSkeleton = ({ count }: { count: number }) => (
  <div className="flex flex-col gap-1">
    <Skeleton className="mb-1 w-16 h-3" />
    {Array.from({ length: count }).map((_, i) => <FriendListItemSkeleton key={i} />)}
  </div>
);

const FriendsList = ({ search = "" }: { search?: string }) => {
  const { friends, onlineFriends, busyFriends, offlineFriends, loading, error } = useFriends();

  const filterByName = (list: Friend[]) => {
    if (!search) return list;
    const normalized = search.toLowerCase();
    return list.filter(f => f.name.toLowerCase().includes(normalized));
  };

  if (loading) return (
    <div className="flex flex-col gap-4">
      <FriendsGroupSkeleton count={2} />
      <FriendsGroupSkeleton count={3} />
    </div>
  );

  if (error) return (
    <div className="p-2 text-destructive text-xs">{error}</div>
  );

  if (friends.length === 0) return <EmptyFriendsList />;

  const filteredOnline = filterByName(onlineFriends);
  const filteredBusy = filterByName(busyFriends);
  const filteredOffline = filterByName(offlineFriends);

  if (filteredOnline.length + filteredBusy.length + filteredOffline.length === 0) return <NoResults />;

  return (
    <div className="flex flex-col gap-4">
      <FriendsGroup title={<span className="text-online">Online · {filteredOnline.length}</span>} friends={filteredOnline} />
      <FriendsGroup title={<span className="text-busy">Busy · {filteredBusy.length}</span>} friends={filteredBusy} />
      <FriendsGroup title={<span className="text-offline">Offline · {filteredOffline.length}</span>} friends={filteredOffline} />
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

const NoResults = () => (
  <div className="flex flex-col justify-center items-center px-4 py-8 border-2 border-border border-dashed rounded-xl">
    <p className="font-medium text-subtitle text-base text-center">No friends found</p>
    <p className="mt-1 text-subtitle text-xs">Try a different name</p>
  </div>
);

const EmptyFriendsList = () => (
  <div className="flex flex-col justify-center items-center px-4 py-8 border-2 border-border border-dashed rounded-xl">
    <span className="opacity-80 mb-2 text-2xl">👻</span>
    <p className="font-medium text-subtitle text-base text-center">Boo... no one around</p>
    <p className="mt-1 text-subtitle text-xs">Add a friend using their code above</p>
  </div>
);

export default FriendsList;
