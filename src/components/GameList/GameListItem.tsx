import { useState } from "react";
import { GAME_STATUSES, type Game, type GameToUpdate } from "../../types/Game";
import OptionsMenu from "../Organisms/OptionsMenu/OptionsMenu";
import { DeleteGameModal, EditGameModal } from "../GameModals";
// styles
import styles from "./GameListItem.module.scss";

type GameListItemProps = {
  deleteGame: () => void;
} & Game;

const GameListItem = ({
  id,
  name,
  status,
  deleteGame,
}: GameListItemProps) => {
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
          deleteGame();
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
