import { useLayoutEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";

import { IoSunny, IoMoon } from "react-icons/io5";
//import { FaHeart } from "react-icons/fa";

type Theme = "light" | "dark" | "theme-girly";

const themes: { key: Theme; icon: React.JSX.Element; label: string }[] = [
  { key: "light", icon: <IoSunny />, label: "Light" },
  { key: "dark", icon: <IoMoon />, label: "Dark" },
  //{ key: "theme-girly", icon: <span>🌸</span>, label: "Girly" },
];

const ThemeToggle = () => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "light"
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "theme-girly");
    if (theme !== "light") {
      root.classList.add(theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col gap-4">
      <h3>Select a Theme</h3>
      <div className={styles["theme-toggle"]}>
        {themes.map((t) => (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            className={`${styles.button} ${theme === t.key ? styles.active : ""
              }`}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  )
};

export default ThemeToggle;