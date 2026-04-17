import { type FC } from "react";
import UpsertModal, { type UpsertModalProps } from "../UpsertModal";

type AddGameModalProps = Omit<UpsertModalProps, "mode" | "gameToEdit">;

const AddGameModal: FC<AddGameModalProps> = (props) => {
  return <UpsertModal mode="add" {...props} />;
};

export default AddGameModal;
