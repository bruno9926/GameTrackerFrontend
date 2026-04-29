import { useLayoutEffect, useState } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

type Theme = "light" | "dark" | "theme-girly";

const themes: { key: Theme; icon: React.JSX.Element; label: string }[] = [
  { key: "light", icon: <IoSunny />, label: "Light" },
  { key: "dark", icon: <IoMoon />, label: "Dark" },
  { key: "theme-girly", icon: <span>🌸</span>, label: "Girly" },
];

const ThemeToggle = () => {
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    return savedTheme || "light";
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

      <div className="flex gap-2">
        {themes.map((t) => (
          <button
            key={t.key}
            onClick={() => setTheme(t.key)}
            title={t.label}
            className={`
              w-9 h-9 rounded-full
              border bg-card text-foreground
              flex items-center justify-center
              cursor-pointer
              transition-transform animation-duration
              hover:scale-110
              ${theme === t.key ? "bg-primary text-primary-foreground" : ""}
            `}
          >
            {t.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;