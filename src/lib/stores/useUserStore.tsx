import { create } from "zustand";

interface UserState {
  isLoggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
}

export const useUserStore = create<UserState>((set) => {
  return {
    isLoggedIn: false, // Default to false initially
    setLoggedIn: (loggedIn) => set({ isLoggedIn: loggedIn }),
  };
});
