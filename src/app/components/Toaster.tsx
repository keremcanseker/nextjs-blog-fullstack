import { toast, Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "@/app/utils/ThemeStore";

interface ToastProps {
  message: string;
  theme: string;
}
type Theme = "light" | "dark";

const showToastSuccess = ({ message, theme }: ToastProps) => {
  toast.success(`${message}`, {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Flip,
    theme: theme as Theme | undefined,
  });
};

const showToastError = ({ message, theme }: ToastProps) => {
  toast.error(`${message}`, {
    position: "bottom-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme as Theme | undefined,
  });
};

const ToastContainerComponent: React.FC = () => {
  return <ToastContainer />;
};

export { showToastSuccess, showToastError, ToastContainerComponent };
