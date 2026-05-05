import { useState } from "react";
import type { Game } from "../../model/Game";
import { DEFAULT_GAME_STATUS } from "../../model/Game";
import useGames from "../../hooks/useGames";
import { SlOptions } from "react-icons/sl";
import { MdLibraryAdd } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@shared/ui/chadcn/dropdown-menu";
import GameCard from "./GameCard";
import toast from "@shared/ui/Atoms/Toast";
import { getErrorMessage } from "@shared/lib/error-messages";

const FriendGameItem = (game: Game) => {
  const { name, status, coverUrl, gameTitleId } = game;
  const { submitGame } = useGames();
  const [adding, setAdding] = useState(false);

  const handleAddToLibrary = async () => {
    setAdding(true);
    try {
      await submitGame({
        name,
        status: DEFAULT_GAME_STATUS,
        gameTitleId,
        ...(coverUrl ? { coverUrl } : {}),
      });
      toast.success(`${name} added to your library!`);
    } catch (e) {
      toast.error(getErrorMessage(e));
    } finally {
      setAdding(false);
    }
  };

  const actions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-foreground cursor-pointer">
          <SlOptions />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={adding} onSelect={handleAddToLibrary}>
          <MdLibraryAdd />
          Add to my library
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return <GameCard name={name} status={status} coverUrl={coverUrl} actions={actions} />;
};

export default FriendGameItem;
