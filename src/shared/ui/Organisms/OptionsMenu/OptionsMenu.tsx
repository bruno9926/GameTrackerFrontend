import { SlOptions } from "react-icons/sl";
import useOptionsMenu from "./useOptionsMenu";
import styles from "./OptionsMenu.module.scss";

type Option = { label: string; action: () => void };

const OptionsMenu = ({ options }: { options: Option[] }) => {
  const { ref, toggleOpen, open, setOpen } = useOptionsMenu();
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

export default OptionsMenu;
