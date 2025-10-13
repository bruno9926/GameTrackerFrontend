import { type FC } from "react";
import UpsertModal, { type UpsertModalProps } from "../UpsertModal";

type EditGameModalProps = Omit<UpsertModalProps, "mode" | "gameToEdit"> & {
  gameToEdit: UpsertModalProps["gameToEdit"];
  updateGame: UpsertModalProps["updateGame"];
};

const EditGameModal: FC<EditGameModalProps> = (props) => {
  return <UpsertModal mode="edit" {...props} />;
};

export default EditGameModal;
