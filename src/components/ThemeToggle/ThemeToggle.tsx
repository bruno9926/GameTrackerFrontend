import { useState } from "react";
import styles from "./ThemeToggle.module.scss";

import { IoSunny, IoMoon } from "react-icons/io5";

const ThemeToggle = () => {
  const [mode, setMode] = useState("dark");

  const light = "light";

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "dark" ? light : "dark";
      document.body.className = newMode;
      return newMode;
    });
  };

  return (
    <button
      className={`${styles["theme-toggle"]} ${styles[mode]}`}
      onClick={() => toggleMode()}
      title={`change to ${mode === "dark" ? light : "dark"} theme`}
    >
      {mode === "dark" ? <IoMoon /> : <IoSunny />}
    </button>
  );
};

export default ThemeToggle;
