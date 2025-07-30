import { Avatar, Button, Modal, Popconfirm, Popover } from "antd";
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const Header: React.FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("quickChatAccessToken");
    navigate("/");
  };

  const popoverContent = (
    <div>
      <p
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => {
          Modal.confirm({
            title: "Confirm Logout",
            content: "Are you sure, you want to log out ?",
            onOk: handleLogout,
          });
        }}
      >
        <CiLogout /> Log Out
      </p>
    </div>
  );

  return (
    <div>
      <header className="flex items-center justify-between px-5 h-[70px] shadow-md">
        <div className="flex items-center gap-1">
          <div>
            <Avatar className="bg-gray-300 text-white mx-4 min-h-[45px] min-w-[45px] ">
              <span className="text-[30px]">QuickChat</span>
            </Avatar>
          </div>
        </div>

        <div className="flex items-center space-x-3  px-5">
          <Popover
            placement="bottomRight"
            trigger="click"
            className="flex cursor-pointer items-center gap-2"
          >
            <Avatar className="bg-gray-300 text-white h-[40px] w-[40px]">
              <FaUser />
            </Avatar>
          </Popover>

          <Popconfirm title={popoverContent} trigger="click">
            <Button danger>
              {" "}
              <CiLogout /> Log out
            </Button>
          </Popconfirm>
        </div>
      </header>
    </div>
  );
};

export default Header;
