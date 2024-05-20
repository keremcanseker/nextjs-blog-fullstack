import { create } from "zustand";

interface LoginState {
  register: boolean;
  setRegister: (register: boolean) => void;
}

export const useLoginStore = create<LoginState>((set) => ({
  register: false,
  setRegister: (register) => set({ register }),
}));
