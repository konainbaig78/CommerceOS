import { useEffect, useState } from "react";
import type { ThemeMode } from "../types/index.ts";

const THEME_KEY = "commerceos-theme";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_KEY);

    if (
      saved === "light" ||
      saved === "dark" ||
      saved === "system"
    ) {
      return saved;
    }

    return "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const applyTheme = () => {
      const shouldUseDark =
        theme === "dark" ||
        (theme === "system" && mediaQuery.matches);

      root.classList.toggle("dark", shouldUseDark);
    };

    applyTheme();

    localStorage.setItem(THEME_KEY, theme);

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);

      return () => {
        mediaQuery.removeEventListener(
          "change",
          applyTheme,
        );
      };
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}