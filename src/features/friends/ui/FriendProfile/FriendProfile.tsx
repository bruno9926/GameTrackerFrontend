import type { Friend } from "@features/user/model/Friend";
import UserAvatar from "@features/friends/ui/UserAvatar/UserAvatar";
import Button from "@shared/ui/Atoms/Button/Button";
import { IoPersonRemoveSharp } from "react-icons/io5";

interface FriendProfileProps {
  friend: Friend;
  onRemove: () => void;
}

const FriendProfile = ({ friend, onRemove }: FriendProfileProps) => {
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

export default FriendProfile;
