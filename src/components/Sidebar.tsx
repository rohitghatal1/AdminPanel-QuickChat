import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import QuickChatLogo from "../assets/logo/QuickChat.png";
import { FaGear } from "react-icons/fa6";

const Sidebar: React.FC = () => {
  const SidebarItems = [
    {
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
      link: "/dashboard",
    },

    {
      icon: <PiUsersThree />,
      label: "Users",
      link: "/mainscreen/users",
    },

    {
      icon: <TiMessages />,
      label: "Messages",
      link: "/mainscreen/messages",
    },

    {
      icon: <FaGear />,
      label: "Settings",
      link: "/settings",
    },
  ];

  return (
    <div className="w-full h-full">
      <div className="px-2 py-1">
        <img src={QuickChatLogo} alt="appLogo" />
      </div>

      <aside className="mt-4">
        {SidebarItems.map((item: any, index: number) => (
          <NavLink
            to={item?.link}
            key={index}
            className={({ isActive }) =>
              `bg-blue-200 text to-blue-700 hover:bg-blue-400 ${
                isActive && "bg-blue-500 font-semibold"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </aside>
    </div>
  );
};

export default Sidebar;
