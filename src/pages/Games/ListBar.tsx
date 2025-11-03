import { CiFilter } from "react-icons/ci";
import { FaSortAmountDown } from "react-icons/fa";
import styles from "./ListBar.module.scss";
import type { FC, ButtonHTMLAttributes } from "react";
import Input from "../../components/Atoms/Input/Input";

const ListBar = () => (
  <div className={styles["list-bar"]}>
    <ListButton>
      <span>Filter</span>
      <CiFilter />
    </ListButton>
    <ListButton>
      <span>Sort</span>
      <FaSortAmountDown />
    </ListButton>
    <Input type="text" placeholder={"Search games..."} />
  </div>
);

const ListButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} className={styles["list-button"]}>
    {props.children}
  </button>
);

export default ListBar;
