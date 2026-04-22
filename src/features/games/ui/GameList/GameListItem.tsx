import { useState } from "react";
import { GAME_STATUS_LABELS, type Game, type GameStatus } from "../../model/Game";
import OptionsMenu from "@shared/ui/Organisms/OptionsMenu/OptionsMenu";
import { DeleteGameModal, EditGameModal } from "../GameModals";
import useGames from "../../hooks/useGames";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import game from "@assets/silksong.webp";

type GameListItemProps = Game;

const gameStatusBadgeStyles: Record<GameStatus, string> = {
  playing: "game-status-badge-playing",
  completed: "game-status-badge-completed",
  wishlist: "game-status-badge-wishlist",
  paused: "game-status-badge-paused",
}

const defaultImage = "/games/default-cover.jpg";

const GameListItem = (game: GameListItemProps) => {
  const { id, name, status, coverUrl} = game;
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { deleteGame } = useGames();

  const options = [
    {
      label: "Edit",
      action: () => {
        setEditModalOpen(true);
      },
    },
    {
      label: "Delete",
      action: () => {
        setDeleteModalOpen(true);
      },
    },
  ];

  return (
    <>
      <div className="flex-row md:flex-col gap-0 md:gap-3 hover:shadow-lg p-0 h-36 md:h-auto overflow-hidden hover:scale-103 transition-all cursor-pointer animation-duration card">
        {/* Image */}
        <div className="relative w-35 md:w-full h-full md:h-50 overflow-hidden shrink-0">
          <img loading="lazy" src={coverUrl ?? defaultImage} alt={`cover of ${game}`} className="opacity-80 w-full h-full object-cover" />
          {/* options */}
          <div className="top-0 right-0 absolute p-2">
            <OptionsMenu options={options} />
          </div>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <p className="md:w-full md:overflow-hidden text-sm md:text-xl md:text-ellipsis md:text-nowrap" title={name}>
            {name}
          </p>
          <div className={gameStatusBadgeStyles[status]}>
            {GAME_STATUS_LABELS[status]} {/*use the label from the status name*/}
          </div>
        </div>
      </div>
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
        gameToEdit={{...game}}
        isOpen={editModalOpen}
        close={() => setEditModalOpen(false)}
      />
    </>

  );
};

export const GameListItemSkeleton = () => {
  return <Skeleton style={{ height: "80px", borderRadius: "12px" }} />;
};

export default GameListItem;
