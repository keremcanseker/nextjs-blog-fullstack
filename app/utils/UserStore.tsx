import { create } from "zustand";
import { renderURL } from "../types/page";

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
