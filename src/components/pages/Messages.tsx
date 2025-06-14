import { Table } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage } from "../../utils/ShowMessages";
import moment from "moment";

const Messages: React.FC = () => {
  const [allMessages, setAllMessages] = useState<any>([]);

  const fetchAllMessages = async () => {
    try {
      const response = await axiosInstance.get("/messages/getMessages");
      setAllMessages(response?.data?.data);
    } catch (err: any) {
      console.log(err);
      showErrorMessage(err);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      render: (text: any) => <span>{moment(text).format("MMM DD, YYYY")}</span>,
    },

    {
      title: "From",
      dataIndex: "From",
      key: "From",
    },

    {
      title: "To",
      dataIndex: "To",
      key: "To",
    },
  ];

  return (
    <div className="bg-white text-left py-2 px-4 rounded-md">
      <h2 className="text-lg font-semibold text-gray-700 py-2">Messages:</h2>

      <div className="mt-4">
        <div className="h-[88vh] overflow-y-auto">
          <Table
            columns={columns}
            dataSource={allMessages}
            pagination={false}
            scroll={{ y: "80vh" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Messages;
