import { Modal } from "antd";
import { MdError } from "react-icons/md";

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
