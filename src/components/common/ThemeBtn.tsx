import { useLayoutEffect, useState } from "react";
import { GiMoon } from "react-icons/gi";
import { MdWbSunny } from "react-icons/md";

interface TThemeButtonProps {}

const LOCAL_STORAGE_KEY = {
  THEME: "theme",
} as const;

const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

const ThemeButton = ({}: TThemeButtonProps) => {
  const [enabledDarkMode, setEnabledDarkMode] = useState(false);

  useLayoutEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY.THEME);
    if (theme === THEME.DARK) {
      document.querySelector("html")?.classList.add(THEME.DARK);
    }
  });

  const toggleTheme = () => {
    const htmlEl = document.querySelector("html");
    if (!htmlEl) return;

    const enabledDarkMode = htmlEl.classList.contains("dark");
    if (enabledDarkMode) {
      htmlEl.classList.remove("dark");
      setEnabledDarkMode(!enabledDarkMode);
      localStorage.removeItem(LOCAL_STORAGE_KEY.THEME);
    } else {
      htmlEl.classList.add("dark");
      setEnabledDarkMode(!enabledDarkMode);
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.DARK);
    }
  };

  return (
    <button onClick={toggleTheme} className="hover:animate-spin">
      {enabledDarkMode ? <MdWbSunny /> : <GiMoon />}
    </button>
  );
};

export default ThemeButton;
