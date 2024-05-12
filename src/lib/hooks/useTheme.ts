import { useEffect } from "react";
import { useThemeStore } from "@/lib/stores/useThemeStore";
import { Theme } from "@/types/theme";

function getDefaultTheme() {
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkMode ? "dark" : "light";
}

export function useTheme() {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    const defaultTheme = getDefaultTheme();
    setTheme(defaultTheme);
  }, [setTheme]);

  return { theme, setTheme };
}
