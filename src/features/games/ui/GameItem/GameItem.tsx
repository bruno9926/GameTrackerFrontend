import { useState } from "react";
import type { Game } from "../../model/Game";
import { DeleteGameModal, EditGameModal } from "../GameModals";
import useGames from "../../hooks/useGames";
import { SlOptions } from "react-icons/sl";
import { RiEditLine, RiDeleteBinLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@shared/ui/chadcn/dropdown-menu";
import GameCard from "../GameCard/GameCard";

const GameItem = (game: Game) => {
  const { id, name, status, coverUrl } = game;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { deleteGame } = useGames();

  const actions = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-foreground cursor-pointer" aria-label="options">
          <SlOptions />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => setEditModalOpen(true)}>
          <RiEditLine />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={() => setDeleteModalOpen(true)}>
          <RiDeleteBinLine />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <GameCard name={name} status={status} coverUrl={coverUrl} actions={actions} />
      <DeleteGameModal
        isOpen={deleteModalOpen}
        close={() => setDeleteModalOpen(false)}
        gameName={name}
        onConfirm={() => {
          deleteGame(id);
          setDeleteModalOpen(false);
        }}
      />
      <EditGameModal
        gameToEdit={{ ...game }}
        isOpen={editModalOpen}
        close={() => setEditModalOpen(false)}
      />
    </>
  );
};

export default GameItem;
