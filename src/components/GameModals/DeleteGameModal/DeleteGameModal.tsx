import Modal, { type ModalProps } from "../../Organisms/Modal/Modal";
import { type FC } from "react";

type DeleteGameModalProps = ModalProps & {
  gameName?: string;
};

const DeleteGameModal: FC<DeleteGameModalProps> = ({ gameName, ...props }) => {
  return (
    <Modal confirmLabel="Delete" {...props}>
      Are you sure you want to delete <b>{gameName || "this game"}</b>?
    </Modal>
  );
};

export default DeleteGameModal;
