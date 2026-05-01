import { useState } from "react";
import AnimatedRoute from "../AnimatedRoute";
import FriendCodeCard from "@features/friends/ui/FriendCodeCard/FriendCodeCard";
import FriendsSearch from "@features/friends/ui/FriendsSearch/FriendsSearch";
import FriendsList from "@features/friends/ui/FriendsList/FriendsList";
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shared/ui/chadcn/tabs";

const Friends = () => {
  const [searchText, setSearchText] = useState("");
  const { debouncedInput: debouncedSearch } = useDebouncedInput(searchText, { debounceTime: 300 });

  return (
    <AnimatedRoute>
      <div className="flex flex-col gap-4 page-padding header-safe-area">
        <h1 className="md:hidden mb-1 font-bold text-title text-4xl">Friends</h1>

        <Tabs defaultValue="friends">
          <TabsList className="w-full">
            <TabsTrigger value="friends" className="flex-1">Friends</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="friends" className="flex flex-col gap-4 mt-2">
            <FriendsSearch value={searchText} onChange={setSearchText} />
            <FriendsList search={debouncedSearch} />
          </TabsContent>
          <TabsContent value="requests" className="flex flex-col gap-4 mt-2">
            <FriendCodeCard code="GT4X-K29R" />
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default Friends;
