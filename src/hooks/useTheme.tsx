import { useEffect, useState } from "react";
import type { ThemeMode } from "../types";

const THEME_KEY = "commerceos-theme";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

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
      const resolvedTheme =
        theme === "system"
          ? getSystemTheme()
          : theme;

      root.classList.toggle("dark", resolvedTheme === "dark");
    };

    applyTheme();

    localStorage.setItem(THEME_KEY, theme);

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme);

      return () => {
        mediaQuery.removeEventListener("change", applyTheme);
      };
    }
  }, [theme]);

  return {
    theme,
    setTheme,
  };
}