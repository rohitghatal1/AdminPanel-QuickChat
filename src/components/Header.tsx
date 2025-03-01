import { Avatar } from "antd";

const Header: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <div>
          <Avatar>R</Avatar>
          Rohit Ghatal
        </div>
        <div>
          <Avatar>R</Avatar>
        </div>
      </div>
    </div>
  );
};

export default Header;
