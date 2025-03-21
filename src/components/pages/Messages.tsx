import { Table } from "antd";
import axios from "axios";
import { useState } from "react";

const Messages: React.FC = () => {
  const [allMessages, setAllMessages] = useState<any>([]);

  const fetchAllMessages = async () => {
    try {
      const response = await axios.get("/messages");
      setAllMessages(response?.data?.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "SN",
      key: "sn",
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
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
    <div>
      <h2 className="text-lg font-semibold text-gray-700 py-2">Messages:</h2>
      <div className="mt-4">
        <div className="h-[88vh] overflow-y-auto">
          <Table columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
