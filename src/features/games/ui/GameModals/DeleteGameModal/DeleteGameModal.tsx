import Modal, { type ModalProps } from "@shared/ui/Organisms/Modal/Modal";
import { type FC } from "react";
import useGames from "@features/games/hooks/useGames";
import toast from "@shared/ui/Atoms/Toast";
import { getErrorMessage } from "@shared/lib/error-messages";

type DeleteGameModalProps = Omit<ModalProps, "onConfirm"> & {
  gameId: string;
  gameName?: string;
};

const DeleteGameModal: FC<DeleteGameModalProps> = ({ gameId, gameName, ...props }) => {
  const { deleteGame } = useGames();

  const handleDelete = async () => {
    try {
      await deleteGame(gameId);
      toast.success("Game deleted successfully!");
      props.close();
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <Modal confirmLabel="Delete" onConfirm={handleDelete} {...props}>
      Are you sure you want to delete <b>{gameName || "this game"}</b>?
    </Modal>
  );
};

export default DeleteGameModal;
