import {
  Modal,
  Table,
  Button,
  Input,
  Card,
  Avatar,
  Tag,
  Space,
  Tooltip,
  message,
} from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage } from "../../utils/ShowMessages";
import {
  FaTrash,
  FaSearch,
  FaUsers,
  FaEye,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { MdRefresh } from "react-icons/md";

const { Search } = Input;

export default function Users() {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user/getUsers");
      setAllUsers(response?.data);
      setFilteredUsers(response?.data);
      console.log("fetched users: ", response?.data);
    } catch (err: any) {
      console.log(err);
      showErrorMessage(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // Search functionality
  const handleSearch = (value: string) => {
    const filtered = allUsers.filter(
      (user: any) =>
        user.name?.toLowerCase().includes(value.toLowerCase()) ||
        user.email?.toLowerCase().includes(value.toLowerCase()) ||
        user.username?.toLowerCase().includes(value.toLowerCase()) ||
        user.number?.includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async (userId: string, userName: string) => {
    Modal.confirm({
      title: "Delete User",
      content: (
        <div>
          <p>
            Are you sure you want to delete <strong>{userName}</strong>?
          </p>
          <p className="text-red-500 text-sm mt-2">
            This action cannot be undone.
          </p>
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          setLoading(true);
          await axiosInstance.delete(`/admin/deleteUser/${userId}`);
          getAllUsers();
        } catch (err: any) {
          showErrorMessage(err);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            icon={<FaUser />}
            style={{ backgroundColor: "#1890ff" }}
          >
            {record.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{record.name}</div>
            <div className="text-sm text-gray-500">@{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Information",
      key: "contact",
      render: (_: any, record: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <FaEnvelope className="text-gray-400" />
            <span>{record.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaPhone className="text-gray-400" />
            <span>{record.number || "N/A"}</span>
          </div>
        </div>
      ),
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
                        `/user/deleteUser/${record._id}`
                      );
                      message.success("user deleted");
                      getAllUsers();
                    } catch (err) {
                      message.error("Failed to delete user");
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
              <FaUsers className="text-blue-600" />
              User Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage and monitor all registered users
            </p>
          </div>
          <div className="flex gap-3">
            <Tooltip title="Refresh Data">
              <Button
                icon={<MdRefresh />}
                onClick={getAllUsers}
                loading={loading}
                className="flex items-center"
              >
                Refresh
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Card className="shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <Search
              placeholder="Search users by name, email, username, or phone..."
              allowClear
              enterButton={<FaSearch />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200">
          <Table
            columns={columns}
            dataSource={filteredUsers}
            loading={loading}
            rowKey="_id"
            pagination={false}
            scroll={{ x: 800, y: "60vh" }}
            className="bg-white"
            rowClassName="hover:bg-gray-50 transition-colors"
          />
        </div>
      </Card>
    </div>
  );
}
