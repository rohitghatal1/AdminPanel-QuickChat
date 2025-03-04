import { Avatar, Badge, Button, Popover } from "antd";

import { FaRegBell, FaSearch, FaTimes, FaUser } from "react-icons/fa";
import { GoClock } from "react-icons/go";

import { MdSupportAgent } from "react-icons/md";
import { Link } from "react-router-dom";

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
          <Link to={"/logs"}>
            <Button
              className=" flex items-center h-10 rounded-xl"
              icon={<GoClock />}
            >
              Logs
            </Button>
          </Link>

          <Popover placement="bottomRight" trigger="click">
            <Badge>
              <div className="rounded-full cursor-pointer p-3 text-lg bg-gray-200">
                <FaRegBell className="text-gray-600 text-[16px]" />
              </div>
            </Badge>
          </Popover>
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
