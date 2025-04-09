import { Table } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function Users() {
  const [allUsers, setAllUsers] = useState<any>([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get("api/users/getUsers");
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
