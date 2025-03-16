import { Table } from "antd";

export default function Users() {
  const columns = [
    {
      title: "SN",
      key: "sn",
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
        <div className="rounded-lg">
          <Table pagination={false} columns={columns} />
        </div>
      </div>
    </div>
  );
}
