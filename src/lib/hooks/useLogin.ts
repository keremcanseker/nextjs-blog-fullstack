import { useLoginStore } from "@/lib/stores/useLoginStore";

export function useLogin() {
  const { register, setRegister } = useLoginStore();
  return { register, setRegister };
}
