import { create } from "zustand";
import { renderURL } from "../types/ApiUrl";

interface UserState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  initializeFromBackend: () => Promise<void>;
}
export const useUserStore = create<UserState>((set) => {
  return {
    isLoggedIn: false, // Default to false initially
    setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
    initializeFromBackend: async () => {
      try {
        // Replace the URL with your actual backend API endpoint
        const response = await fetch(renderURL + "/auth/home", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();
        // Assuming your backend response contains a field like "isLoggedIn"
        const isLoggedIn = data.isAuthenticated;

        // Update the local state
        set({ isLoggedIn: isLoggedIn });
      } catch (error) {}
    },
  };
});
