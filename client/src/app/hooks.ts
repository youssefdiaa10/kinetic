import { useDispatch, useSelector } from "react-redux";
import { toast, type ToastOptions } from "react-toastify";
import type { AppDispatch, RootState } from "./store";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useToast = () => {
  const baseOptions: ToastOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const success = (msg: string) => toast.success(msg, baseOptions);

  const error = (msg: string | ApiError) => {
    let errorMessage = "An error occurred";

    if (typeof msg === "string") {
      errorMessage = msg;
    } else if (msg?.message) {
      errorMessage = msg.message;
    }

    toast.error(errorMessage, baseOptions);
  };

  return {
    success,
    error,
  };
};
