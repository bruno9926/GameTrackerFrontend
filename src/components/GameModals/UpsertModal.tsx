import Modal, { type ModalProps } from "../Organisms/Modal/Modal";
import Input from "../Atoms/Input/Input";
import { useState, type FC } from "react";
import useGames from "../../hooks/useGames";
import styles from "./AddGameModal/AddGameModal.module.scss";
import { Select, SelectItem } from "../Atoms/Select";
import {
  type Game,
  type GameStatus,
  type GameToUpdate,
  DEFAULT_GAME_STATUS,
  GAME_STATUSES,
} from "../../types/Game";
import ErrorMessage from "../Atoms/ErrorMessage/ErrorMessage";
import toast from "../Atoms/Toast"; 

export type UpsertModalProps = ModalProps & {
  mode: "add" | "edit";
  gameToEdit?: Game;
  onSubmit?: () => void;
  updateGame?: (game: GameToUpdate) => void;
};

const UpsertModal: FC<UpsertModalProps> = ({
  onSubmit = () => {},
  updateGame = () => {},
  gameToEdit,
  mode,
  ...modalProps
}) => {
  const isEditMode = mode === "edit";
  const [name, setName] = useState(gameToEdit?.name || "");
  const [status, setStatus] = useState<GameStatus>(
    gameToEdit?.status || DEFAULT_GAME_STATUS
  );

  const clearFields = () => {
    setName("");
    setStatus(DEFAULT_GAME_STATUS);
  };

  const { submitGame, loading, error, clearError } = useGames();

  const close = () => {
    if (!isEditMode) {
      clearFields();
    }
    clearError();
    modalProps.close();
  };

  const postGame = async () => {
    try {
      if (isEditMode && gameToEdit) {
        // Update existing game logic here
        await updateGame({ id: gameToEdit.id, name, status });
      } else {
        // Add new game logic here
        await submitGame({ name, status });
      }
      clearFields();
      clearError();
      close();
      onSubmit();
      toast.success(`Game ${isEditMode ? "updated" : "added"} successfully!`);
    } catch {
      // dont close the modal
    }
  };

  return (
    <Modal
      title={isEditMode ? "Edit game" : "Add a new game"}
      onConfirm={postGame}
      confirmLabel={isEditMode ? "Save" : "Add"}
      loading={loading}
      {...modalProps}
      close={close}
    >
      <div className={styles["modal-content"]}>
        <form className={styles.form}>
          <Input
            label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <Select
            label="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as GameStatus)}
          >
            {Object.entries(GAME_STATUSES).map(([name, label]) => (
              <SelectItem key={name} value={name}>
                {label}
              </SelectItem>
            ))}
          </Select>
        </form>
        {error && <ErrorMessage message={error} />}
      </div>
    </Modal>
  );
};

export default UpsertModal;
