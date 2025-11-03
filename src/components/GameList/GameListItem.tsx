import { useState } from "react";
import { GAME_STATUSES, type Game } from "../../types/Game";
import OptionsMenu from "../Organisms/OptionsMenu/OptionsMenu";
import { DeleteGameModal, EditGameModal } from "../GameModals";
import useGames from "../../hooks/useGames";
// styles
import styles from "./GameListItem.module.scss";

type GameListItemProps = Game;

const GameListItem = ({ id, name, status }: GameListItemProps) => {
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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { deleteGame } = useGames();

  return (
    <div className={styles["game-list-item"]}>
      <p className={styles["game-name"]} title={name}>
        {name}
      </p>
      <div className={styles["right-element"]}>
        <div className={styles["game-status"] + " " + styles[status]}>
          {GAME_STATUSES[status]} {/*use the label from the status name*/}
        </div>
        <div className={styles.options}>
          <OptionsMenu options={options} />
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
        gameToEdit={{ id, name, status }}
        isOpen={editModalOpen}
        close={() => setEditModalOpen(false)}
      />
    </div>
  );
};

export default GameListItem;
