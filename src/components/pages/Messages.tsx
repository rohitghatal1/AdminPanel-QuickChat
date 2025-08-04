import {
  Modal,
  Table,
  Button,
  Input,
  Card,
  Space,
  Tooltip,
  message,
} from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage } from "../../utils/ShowMessages";
import moment from "moment";
import { FaTrash, FaSearch } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { TiMessages } from "react-icons/ti";

const { Search } = Input;

const Messages: React.FC = () => {
  const [allMessages, setAllMessages] = useState<any>([]);
  const [filteredMessages, setFilteredMessages] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchAllMessages = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/message/getMessages");
      setAllMessages(response?.data);
      setFilteredMessages(response?.data);
      console.log("Fetched messages:", response?.data);
    } catch (err: any) {
      console.log(err);
      showErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMessages();
  }, []);

  // Enhanced search functionality
  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  // Apply multiple filters
  const applyFilters = (search: string, dates: any) => {
    let filtered = [...allMessages];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (message: any) =>
          message.From?.toLowerCase().includes(search.toLowerCase()) ||
          message.To?.toLowerCase().includes(search.toLowerCase()) ||
          message.content?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Date range filter
    if (dates && dates.length === 2) {
      filtered = filtered.filter((message: any) => {
        const messageDate = moment(message.Date);
        return messageDate.isBetween(dates[0], dates[1], "day", "[]");
      });
    }

    setFilteredMessages(filtered);
  };

  const columns = [
    {
      title: "Sent At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => (
        <div>
          <div className="font-medium text-gray-900">
            {moment(text).format("MMM DD, YYYY")}
          </div>
          <div className="text-sm text-gray-500">
            {moment(text).format("HH:mm:ss")}
          </div>
        </div>
      ),
    },
    {
      title: "Sender",
      key: "sender",
      dataIndex: "sender",
      render: (text: any) => <p>{text?.name}</p>,
    },
    {
      title: "Receiver",
      key: "receiver",
      dataIndex: "receiver",
      render: (text: any) => <p>{text?.name}</p>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Delete Message">
            <Button
              danger
              icon={<FaTrash />}
              onClick={() =>
                Modal.confirm({
                  title: "Are you sure you want to delete this message?",
                  okText: "Delete",
                  okType: "danger",
                  cancelText: "Cancel",
                  onOk: async () => {
                    try {
                      await axiosInstance.delete(
                        `/message/deleteMessage/${record._id}`
                      );
                      message.success("Message deleted");
                      fetchAllMessages();
                    } catch (err) {
                      message.error("Failed to delete message");
                    }
                  },
                })
              }
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <TiMessages className="text-blue-600" />
              Message Management
            </h1>
            <p className="text-gray-600 mt-1">
              Monitor and manage all system messages
            </p>
          </div>
          <div className="flex gap-3">
            <Tooltip title="Refresh Messages">
              <Button
                icon={<MdRefresh />}
                onClick={fetchAllMessages}
                loading={loading}
              >
                Refresh
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="mb-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Search
                placeholder="Search messages by sender, recipient, or content..."
                allowClear
                enterButton={<FaSearch />}
                size="large"
                onSearch={handleSearch}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table
            columns={columns}
            dataSource={filteredMessages}
            loading={loading}
            rowKey="_id"
            pagination={false}
            scroll={{ x: 1000, y: "60vh" }}
            className="bg-white"
            rowClassName="hover:bg-gray-50 transition-colors"
          />
        </div>
      </Card>
    </div>
  );
};

export default Messages;
