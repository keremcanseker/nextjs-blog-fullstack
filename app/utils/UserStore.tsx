import { create } from "zustand";
import { renderURL } from "../types/post";

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
