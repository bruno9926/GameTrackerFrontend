import { useState } from "react";
import AnimatedRoute from "../AnimatedRoute";
import FriendCodeCard from "@features/friends/ui/FriendCodeCard/FriendCodeCard";
import FriendsSearch from "@features/friends/ui/FriendsSearch/FriendsSearch";
import FriendsList from "@features/friends/ui/FriendsList/FriendsList";
import FriendRequestsList from "@features/friends/ui/FriendRequestsList/FriendRequestsList";
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shared/ui/chadcn/tabs";

const FriendsPanel = () => {
  const [search, setSearch] = useState("");
  const { debouncedInput } = useDebouncedInput(search, { debounceTime: 300 });
  return (
    <div className="flex flex-col gap-4">
      <FriendsSearch value={search} onChange={setSearch} />
      <FriendsList search={debouncedInput} />
    </div>
  );
};

const RequestsPanel = () => {
  const [search, setSearch] = useState("");
  const { debouncedInput } = useDebouncedInput(search, { debounceTime: 300 });
  return (
    <div className="flex flex-col gap-6">
      <FriendCodeCard code="GT4X-K29R" />
      <div className="flex flex-col gap-3">
        <FriendsSearch value={search} onChange={setSearch} placeholder="Search requests..." />
        <FriendRequestsList search={debouncedInput} />
      </div>
    </div>
  );
};

const Friends = () => {

  return (
    <AnimatedRoute>
      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-4 page-padding header-safe-area">
        <h1 className="mb-1 font-bold text-title text-4xl">Friends</h1>
        <Tabs defaultValue="friends">
          <TabsList className="w-full">
            <TabsTrigger value="friends" className="flex-1">Friends</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="friends" className="mt-2">
            <FriendsPanel />
          </TabsContent>
          <TabsContent value="requests" className="mt-2">
            <RequestsPanel />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col gap-6 mx-auto w-full max-w-6xl page-padding header-safe-area">
        <div className="gap-6 grid grid-cols-3">
          <div className="flex flex-col gap-4 col-span-2">
            <h2>Your Friends</h2>
            <FriendsPanel />
          </div>
          <div className="flex flex-col gap-4 col-span-1">
            <h2>Friendship Requests</h2>
            <RequestsPanel />
          </div>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Friends;