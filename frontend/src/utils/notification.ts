import { ToastOptions, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const showNotification = (message: any, options?: ToastOptions<{}>) => {
  toast(message, {
    theme: "colored",
    position: "top-right",
    hideProgressBar: false,
    autoClose: 2000,
    ...options,
  });
};
export default showNotification;
