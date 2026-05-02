import { useState } from "react";
import AnimatedRoute from "../AnimatedRoute";
import FriendCodeCard from "@features/friends/ui/FriendCodeCard/FriendCodeCard";
import FriendsSearch from "@features/friends/ui/FriendsSearch/FriendsSearch";
import FriendsList from "@features/friends/ui/FriendsList/FriendsList";
import FriendRequestsList from "@features/friends/ui/FriendRequestsList/FriendRequestsList";
import { useDebouncedInput } from "@shared/hooks/useDebouncedInput";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@shared/ui/chadcn/tabs";

type PanelProps = { search: string; onSearchChange: (v: string) => void };

const FriendsPanel = ({ search, onSearchChange }: PanelProps) => (
  <div className="flex flex-col gap-4">
    <FriendsSearch value={search} onChange={onSearchChange} />
    <FriendsList search={search} />
  </div>
);

const RequestsPanel = ({ search, onSearchChange }: PanelProps) => (
  <div className="flex flex-col gap-6">
    <FriendCodeCard code="GT4X-K29R" />
    <div className="flex flex-col gap-3">
      <FriendsSearch value={search} onChange={onSearchChange} placeholder="Search requests..." />
      <FriendRequestsList search={search} />
    </div>
  </div>
);

const Friends = () => {
  const [searchText, setSearchText] = useState("");
  const [requestSearch, setRequestSearch] = useState("");
  const { debouncedInput: debouncedSearch } = useDebouncedInput(searchText, { debounceTime: 300 });
  const { debouncedInput: debouncedRequestSearch } = useDebouncedInput(requestSearch, { debounceTime: 300 });

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
            <FriendsPanel search={debouncedSearch} onSearchChange={setSearchText} />
          </TabsContent>
          <TabsContent value="requests" className="mt-2">
            <RequestsPanel search={debouncedRequestSearch} onSearchChange={setRequestSearch} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col gap-6 mx-auto w-full max-w-6xl page-padding header-safe-area">
        <div className="gap-6 grid grid-cols-3">
          <div className="flex flex-col gap-4 col-span-2">
            <h2>Friendship Requests</h2>
            <FriendsPanel search={debouncedSearch} onSearchChange={setSearchText} />
          </div>
          <div className="flex flex-col gap-4 col-span-1">
            <h2>Your Friends</h2>
            <RequestsPanel search={debouncedRequestSearch} onSearchChange={setRequestSearch} />
          </div>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Friends;
