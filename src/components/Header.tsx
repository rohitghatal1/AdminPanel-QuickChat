import { Avatar, Popover } from "antd";

import { FaSearch, FaTimes, FaUser } from "react-icons/fa";

import { MdSupportAgent } from "react-icons/md";

const Header: React.FC = () => {
  return (
    <div>
      <header className="  flex items-center justify-between px-5 h-[70px] shadow-md">
        <div className="flex items-center gap-1">
          <div>
            <Avatar className="bg-gray-300 text-white mx-4 min-h-[45px] min-w-[45px] ">
              <span className="text-[30px]"> Rohit Ghatal</span>
            </Avatar>
          </div>

          <div className=""></div>
        </div>

        <div className="flex items-center space-x-3  px-5">
          <Popover placement="bottomLeft" trigger="click" className="relative">
            <i className="text-gray-500 absolute top-[7px] left-3 translate-y-1">
              <FaSearch />
            </i>
            <input
              placeholder="Search Customers / Leads"
              className="w-[18rem] h-10 border text-sm rounded-xl focus:outline-none pl-10"
            />
            {
              <span className=" flex items-center absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <FaTimes className="text-gray-500" />
              </span>
            }
          </Popover>

          <Popover
            placement="bottomRight"
            trigger="click"
            // open={open}
            // onOpenChange={() => setOpen(!open)}
            // content={content}
            className="flex cursor-pointer items-center gap-2"
          >
            <Avatar
              className="bg-gray-300 text-white  h-[40px] w-[40px]"
              // src={userData?.image}
            >
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
