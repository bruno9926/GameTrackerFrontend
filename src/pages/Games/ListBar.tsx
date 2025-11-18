import { CiFilter } from "react-icons/ci";
import { FaSortAmountDown } from "react-icons/fa";
import styles from "./ListBar.module.scss";
import type { FC, ButtonHTMLAttributes } from "react";
import Input from "../../components/Atoms/Input/Input";
import type React from "react";

type ListBarProps = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const ListBar = ({ searchText, setSearchText }: ListBarProps) => (
  <div className={styles["list-bar"]}>
    <ListButton>
      <span>Filter</span>
      <CiFilter />
    </ListButton>
    <ListButton>
      <span>Sort</span>
      <FaSortAmountDown />
    </ListButton>
    <Input
      type="text"
      placeholder={"Search games..."}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
);

const ListButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} className={styles["list-button"]}>
    {props.children}
  </button>
);

export default ListBar;
