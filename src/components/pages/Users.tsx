import { Table } from "antd";

export default function Users() {
  return (
    <div>
      <h2>Users</h2>
      <div className="px-4">
        <h2>All users: </h2>
        <div className="rounded-lg">
          <Table pagination={false} />
        </div>
      </div>
    </div>
  );
}
