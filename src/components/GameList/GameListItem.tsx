import { useState, useRef, useEffect } from "react";
import { SlOptions } from "react-icons/sl";
import { GAME_STATUSES, type Game } from "../../types/Game";
// styles
import styles from "./GameListItem.module.scss";

type GameListItemProps = {} & Game;

type Option = { label: string; action: () => void };

const GameListItem = ({ name, status }: GameListItemProps) => {
  const options: Option[] = [
    { label: "Edit", action: () => {} },
    { label: "Delete", action: () => {} },
  ];

  return (
    <div className={styles["game-list-item"]}>
      <p className={styles["game-name"]} title={name}>
        {name}
      </p>
      <div className={styles["right-element"]}>
        <div className={styles["game-status"] + " " + styles[status]}>
          {GAME_STATUSES[status]} {/*use the label from the status name*/}
        </div>
        <Options options={options} />
      </div>
    </div>
  );
};

const Options = ({ options }: { options: Option[] }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    console.log("toggling");
    setOpen((prev) => !prev);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={ref}
      className={`${styles["options"]} ${open ? styles["open"] : ""}`}
    >
      <SlOptions onClick={() => toggleOpen()} />
      <div
        className={`${styles["options-menu"]} ${open ? styles["open"] : ""}`}
      >
        {options.map((option) => (
          <div
            key={option.label}
            className={styles["option"]}
            onClick={() => {
              option.action();
              setOpen(false);
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameListItem;
