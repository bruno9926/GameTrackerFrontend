import Modal, { type ModalProps } from "@shared/ui/Organisms/Modal/Modal";
import { Field, FieldLabel } from "@shared/ui/chadcn/field";
import { useState, useEffect, type FC } from "react";
import useGames from "../../hooks/useGames";
import GameTitleSearch from "./GameTitleSearch";
import {
  type Game,
  type GameStatus,
  type GameToUpdate,
  DEFAULT_GAME_STATUS,
  GAME_STATUS_LABELS,
} from "../../model/Game";
import type { GameTitle } from "@features/games/model/GameTitle";
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
import { IoMdClose } from "react-icons/io";

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

  const [searchString, setSearchString] = useState("");
  const [selectedGameTitle, setSelectedGameTitle] = useState<GameTitle | null>(null);
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [status, setStatus] = useState<GameStatus>(
    gameToEdit?.status || DEFAULT_GAME_STATUS
  );

  useEffect(() => {
    if (isEditMode && gameToEdit && gameToEdit.gameTitleId) {
      // first population of selected game, it is build from the game data
      // improve the way to build the game title
      setSelectedGameTitle({
        sourceId: gameToEdit.gameTitleId,
        source: "igdb",
        name: gameToEdit.name,
        cover: gameToEdit.coverUrl ?? null
      });
    }
  }, [gameToEdit, isEditMode]);

  const clearFields = () => {
    setSelectedGameTitle(null);
    setSearchString("");
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
    if (selectedGameTitle === null) {
      setSelectionError("Please select a game title");
      return;
    }
    setSelectionError(null);
    const { name, cover, sourceId: gameTitleId } = selectedGameTitle;

    try {
      if (isEditMode && gameToEdit) {
        await updateGame({
          ...{ id: gameToEdit.id, name, status },
          ...(cover !== null ? { coverUrl: cover } : {})
        });
      } else {
        await submitGame({
          ...{ name, status, gameTitleId },
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

  const SelectedGamePreview = () => (
    <>
      {
        selectedGameTitle &&
        <div className="flex flex-row justify-between items-center card">
          <div className="flex flex-row items-center gap-4">
            <img
              className="items-center rounded-sm w-10"
              src={selectedGameTitle.cover ?? ""}
              alt={selectedGameTitle.name}
            />
            <span>{selectedGameTitle.name}</span>
          </div>
          <button className="cursor-pointer" onClick={() => {
            setSelectedGameTitle(null);
            setSearchString("");
          }}>
            <IoMdClose />
          </button>
        </div>
      }
    </>
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
          <GameTitleSearch
            selectedGameTitle={selectedGameTitle}
            searchString={searchString}
            setSearchString={setSearchString}
            onSelectValue={(gameTitle) => {
              setSelectedGameTitle(gameTitle)
            }}
            selectionError={selectionError}
            setSelectionError={setSelectionError}
          />
          <SelectedGamePreview />
          <StatusSelect />
        </form>
        {error && <ErrorMessage message={error} />}
      </div>
    </Modal>
  );
};

export default UpsertModal;
