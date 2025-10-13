import { useState } from "react";
import DeleteGameModal from "../DeleteGameModal/DeleteGameModal";
import { GAME_STATUSES, type Game } from "../../types/Game";
import OptionsMenu from "../Organisms/OptionsMenu/OptionsMenu";
// styles
import styles from "./GameListItem.module.scss";

type GameListItemProps = {
  deleteGame: () => void;
} & Game;

const GameListItem = ({ name, status, deleteGame }: GameListItemProps) => {
  const options = [
    { label: "Edit", action: () => {} },
    {
      label: "Delete",
      action: () => {
        setDeleteModalOpen(true);
      },
    },
  ];

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        confirmLabel="Delete"
        gameName={name}
        onConfirm={() => {
          deleteGame();
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default GameListItem;
