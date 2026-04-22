import Modal, { type ModalProps } from "@shared/ui/Organisms/Modal/Modal";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { useState, type FC } from "react";
import useGames from "../../hooks/useGames";
import GameTitleSearch from "./GameTitleSearch";
import {
  type Game,
  type GameStatus,
  type GameToUpdate,
  DEFAULT_GAME_STATUS,
  GAME_STATUS_LABELS,
} from "../../model/Game";
import ErrorMessage from "@shared/ui/Atoms/ErrorMessage/ErrorMessage";
import toast from "@shared/ui/Atoms/Toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/chadcn/select";

export type UpsertModalProps = ModalProps & {
  mode: "add" | "edit";
  gameToEdit?: Game;
  updateGame?: (game: GameToUpdate) => void;
};

const statusColor: Record<string, string> = {
  paused: "text-paused",
  playing: "text-playing",
  wishlist: "text-wishlist",
  completed: "text-completed",
};

const UpsertModal: FC<UpsertModalProps> = ({
  gameToEdit,
  mode,
  ...modalProps
}) => {
  const isEditMode = mode === "edit";
  const [name, setName] = useState(gameToEdit?.name || "");
  const [cover, setCover] = useState<string | null>(null);
  const [status, setStatus] = useState<GameStatus>(
    gameToEdit?.status || DEFAULT_GAME_STATUS
  );

  const clearFields = () => {
    setName("");
    setStatus(DEFAULT_GAME_STATUS);
  };

  const { submitGame, updateGame, loading, error, clearError, fetchGames } = useGames();

  const close = () => {
    if (!isEditMode) {
      clearFields();
    }
    clearError();
    modalProps.close();
  };
  
  const handleSubmit = async () => {
    try {
      if (isEditMode && gameToEdit) {
        // Update existing game logic here
        await updateGame({
          ...{ id: gameToEdit.id, name, status },
          ...(cover !== null ? { coverUrl: cover } : {})
        });
      } else {
        console.log(name)
        // Add new game logic here
        await submitGame({
          ...{ name, status },
          ...(cover !== null ? { coverUrl: cover } : {})
        });
      }
      clearFields();
      clearError();
      close();
      fetchGames();
      toast.success(`Game ${isEditMode ? "updated" : "added"} successfully!`);
    } catch {
      // dont close the modal
    }
  };
  const StatusSelect = () => (
    <Field>
      <FieldLabel htmlFor="status">Status</FieldLabel>
      <Select value={status} onValueChange={(value) => setStatus(value as GameStatus)}>
        <SelectTrigger id="status" className="w-full">
          <SelectValue placeholder="Game Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {
              Object.entries(GAME_STATUS_LABELS).map(([name, label]) => (
                <SelectItem value={name} key={name}>
                  <span className={statusColor[name]}>{label}</span>
                </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )

  return (
    <Modal
      title={isEditMode ? "Edit game" : "Add a new game"}
      onConfirm={handleSubmit}
      confirmLabel={isEditMode ? "Save" : "Add"}
      loading={loading}
      {...modalProps}
      close={close}
    >
      <div>
        <form className="form-group mb-4">
          <GameTitleSearch onSelectValue={(gameTitle) => {
            setName(gameTitle.name);
            setCover(gameTitle.cover);
          }}/>
          <StatusSelect />
        </form>
        {error && <ErrorMessage message={error} />}
      </div>
    </Modal>
  );
};

export default UpsertModal;
