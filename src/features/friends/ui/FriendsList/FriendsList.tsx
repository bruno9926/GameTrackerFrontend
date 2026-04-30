import FriendItem, { FriendListItemSkeleton } from "../FriendItem";
import { useFriends } from "../../hook/useFriends";

const FriendsList = () => {
  const { friends, loading, error } = useFriends();

  if (loading) return (
    <div className="flex flex-col gap-3 mt-4">
      {Array.from({ length: 3 }).map((_, i) => <FriendListItemSkeleton key={i} />)}
    </div>
  );

  if (error) return (
    <div className="p-2 text-destructive text-xs">{error}</div>
  );

  if (friends.length === 0) return <EmptyFriendsList />;

  return (
    <div className="flex flex-col gap-3 mt-4">
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
