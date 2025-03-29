import { Table } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Users() {
  const [allUsers, setAllUsers] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("api/users/getUsers");
      setAllUsers(response?.data?.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const columns = [
    {
      title: "SN",
      key: "sn",
      render: () => <span>1</span>,
    },

    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
    },

    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },

    {
      title: "Contact",
      dataIndex: "Contact",
      key: "Contact",
    },
  ];

  return (
    <div>
      <h2>Users</h2>
      <div className="px-4">
        <h2>All users: </h2>
        <div>
          <p>All registered users:</p>
        </div>
        <div className="rounded-lg">
          <Table pagination={false} columns={columns} dataSource={allUsers} />
        </div>
      </div>
    </div>
  );
}
