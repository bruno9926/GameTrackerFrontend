import { useState } from "react";
import AnimatedRoute from "../AnimatedRoute";
import FriendCodeCard from "@features/friends/ui/FriendCodeCard/FriendCodeCard";
import FriendsSearch from "@features/friends/ui/FriendsSearch/FriendsSearch";
import FriendsList from "@features/friends/ui/FriendsList/FriendsList";
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";

const Friends = () => {
  const [searchText, setSearchText] = useState("");
  const { debouncedInput: debouncedSearch } = useDebouncedInput(searchText, { debounceTime: 300 });

  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-4 page-padding header-safe-area">
        <h1 className="md:hidden mb-1 font-bold text-title text-4xl">Friends</h1>
        <FriendCodeCard code="GT4X-K29R" />
        <div className="flex flex-col gap-4 mt-2">
          <FriendsSearch value={searchText} onChange={setSearchText} />
          <FriendsList search={debouncedSearch} />
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Friends;
