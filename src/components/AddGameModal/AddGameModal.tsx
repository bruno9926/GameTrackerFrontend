import Modal, { type ModalProps } from "../Organisms/Modal/Modal";
import Input from "../Atoms/Input/Input";
import { useState, type FC } from "react";
import useGames from "../../hooks/useGames";
import styles from "./AddGameModal.module.scss";
import { Select, SelectItem } from "../Atoms/Select/";
import {
  type GameStatus,
  DEFAULT_GAME_STATUS,
  GAME_STATUSES,
} from "../../types/Game";
import ErrorMessage from "../Atoms/ErrorMessage/ErrorMessage";

type AddGameModalProps = ModalProps & {
  onSubmit: () => void;
};

const AddGameModal: FC<AddGameModalProps> = ({ onSubmit, ...modalProps }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState<GameStatus>(DEFAULT_GAME_STATUS);

  const clearFields = () => {
    setName("");
    setStatus(DEFAULT_GAME_STATUS);
  };

  const { submitGame, loading, error, clearError } = useGames();

  const close = () => {
    clearFields();
    clearError();
    modalProps.close();
  };

  const postGame = async () => {
    try {
      await submitGame({ name, status });
      clearFields();
      clearError();
      close();
      onSubmit();
    } catch {
      // dont close the modal
    }
  };
  return (
    <Modal
      title="Add a new game"
      onConfirm={postGame}
      confirmLabel="Add"
      loading={loading}
      {...modalProps}
      close={() => close()}
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

export default AddGameModal;
