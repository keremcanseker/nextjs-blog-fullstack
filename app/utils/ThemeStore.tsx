import { create } from "zustand";
import { persist, StateStorage } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}
export const useThemeStore = create(
  persist<ThemeState>(
    (set) => {
      const prefersDarkMode =
        typeof window !== "undefined" &&
        localStorage.getItem("theme") === "dark"
          ? true
          : window.matchMedia("(prefers-color-scheme: dark)").matches;

      const defaultTheme: "light" | "dark" = prefersDarkMode ? "dark" : "light";

      return {
        theme: defaultTheme,
        setTheme: (theme) => {
          set({ theme });
          // Save the theme to localStorage only if running on the client side
          if (typeof window !== "undefined") {
            localStorage.setItem("theme", theme);
          }
        },
      };
    },
    {
      name: "theme-storage",
      // Specify the type of storage
      getStorage: () => localStorage as StateStorage,
    }
  )
);
