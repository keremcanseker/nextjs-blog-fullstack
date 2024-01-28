import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useThemeStore = create(
  persist<ThemeState>(
    (set) => {
      // const prefersDarkMode = window.matchMedia(
      //   "(prefers-color-scheme: dark)"
      // ).matches;
      // const prefersDarkMode = false;
      // const defaultTheme: "light" | "dark" = prefersDarkMode ? "dark" : "light";
      // get the default Theme from sessionstorage
      const defaultTheme: "light" | "dark" =
        (sessionStorage.getItem("theme-storage") as "light" | "dark") ||
        "light";

      return {
        theme: defaultTheme,
        setTheme: (theme) => set({ theme }),
      };
    },
    {
      name: "theme-storage",
      storage: createJSONStorage(() => sessionStorage), // Specify the type of storage
    }
  )
);
