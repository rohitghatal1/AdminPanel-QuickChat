import { Table } from "antd";

const Messages: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 py-2">Messages:</h2>
      <div className="mt-4">
        <div className="h-[88vh] overflow-y-auto">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Messages;
