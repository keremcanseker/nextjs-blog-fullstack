import { create } from "zustand";

interface LogInState {
  register: boolean;
  setRegister: (register: boolean) => void;
}

export const useLogInStore = create<LogInState>((set) => ({
  register: false,
  setRegister: (register) => set({ register }),
}));
