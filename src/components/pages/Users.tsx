import { Modal, Table } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { showErrorMessage } from "../../utils/ShowMessages";
import { FaTrash } from "react-icons/fa";

export default function Users() {
  const [allUsers, setAllUsers] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("/users/getUsers");
      setAllUsers(response?.data);
      console.log("fetched users: ", response?.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Contact",
      dataIndex: "number",
      key: "number",
    },

    {
      title: "Action",
      key: "Action",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-1">
          <FaTrash
            onClick={() =>
              Modal.confirm({
                title: "Confirm Delete",
                content: "Are you sure, you want to delete this user ?",
                onOk: async () => {
                  try {
                    await axiosInstance.delete(
                      `/admin/deleteUser/${record?._id}`
                    );
                  } catch (err: any) {
                    showErrorMessage(err);
                  }
                },
              })
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white px-4 py-2">
      <h2 className="font-semibold text-lg">Users</h2>
      <div className="px-4">
        <h2 className="text-lg py-2 font-semibold">All users: </h2>
        <div className="rounded-lg">
          <Table
            pagination={false}
            columns={columns}
            dataSource={allUsers}
            scroll={{ y: "80vh" }}
          />
        </div>
      </div>
    </div>
  );
}
