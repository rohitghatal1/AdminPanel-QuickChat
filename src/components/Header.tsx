import { Avatar, Popover } from "antd";
import { FaUser } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

const Header: React.FC = () => {
  return (
    <div>
      <header className="  flex items-center justify-between px-5 h-[70px] shadow-md">
        <div className="flex items-center gap-1">
          <div>
            <Avatar className="bg-gray-300 text-white mx-4 min-h-[45px] min-w-[45px] ">
              <span className="text-[30px]">QC</span>
            </Avatar>
          </div>

          <div className=""></div>
        </div>

        <div className="flex items-center space-x-3  px-5">
          <Popover
            placement="bottomRight"
            trigger="click"
            className="flex cursor-pointer items-center gap-2"
          >
            <Avatar className="bg-gray-300 text-white  h-[40px] w-[40px]">
              <FaUser />
            </Avatar>
          </Popover>

          {
            <i className="text-4xl text-gray-600 cursor-pointer">
              <MdSupportAgent />
            </i>
          }
        </div>
      </header>
    </div>
  );
};

export default Header;
