import { message as antMessage, Modal } from "antd";
import { MdError, MdCheckCircle } from "react-icons/md";
import Lottie from "react-lottie-player";
import successCheckAnimation from "../assets/photos/successAnimation.json";

const ensureString = (content: any): string => {
  if (content === null || content === undefined) {
    return "Operation completed";
  }

  if (typeof content === "string") {
    return content;
  }

  if (content instanceof Error) {
    return content.message || "An error occurred";
  }

  if (typeof content === "object") {
    if (typeof content.message === "string") {
      return content.message;
    }

    try {
      return JSON.stringify(content);
    } catch {
      return "Operation completed";
    }
  }

  try {
    return String(content);
  } catch {
    return "Operation completed";
  }
};

export const showSuccessMessage = (message: string) => {
  Modal.success({
    maskClosable: true,
    centered: true,
    icon: null,
    title: (
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 -mt-14 bg-white flex items-center justify-center rounded-full shadow-md overflow-hidden">
          <Lottie
            animationData={successCheckAnimation}
            play={true}
            loop={false}
            speed={1.5}
            style={{ width: 80, height: 80 }}
          />
        </div>
        <p className="text-green-600 text-lg font-semibold mt-3">SUCCESS!</p>
      </div>
    ),

    content: <p className="text-center text-gray-700">{message}</p>,
    okText: "Ok",
    okButtonProps: {
      className:
        "bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-full px-8 py-2 mt-2",
    },
    className: "custom-modal",
  });
};

export const showErrorMessage = (message: string) => {
  Modal.confirm({
    maskClosable: true,
    closable: true,
    centered: true,
    title: <p className="ml-1 text-sm">Failed</p>,
    icon: <MdError className="text-xl text-red-500" />,
    cancelButtonProps: { className: "hidden" },
    content: message,
    okText: "OK",
    okButtonProps: { className: "bg-red-500 hover:!bg-red-600" },
  });
};
