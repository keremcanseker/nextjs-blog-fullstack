import { set } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));

// const prefersDarkMode = window.matchMedia(
//   "(prefers-color-scheme: dark)"
// ).matches;
// const prefersDarkMode = false;
// const defaultTheme: "light" | "dark" = prefersDarkMode ? "dark" : "light";
// get the default Theme from sessionstorage
