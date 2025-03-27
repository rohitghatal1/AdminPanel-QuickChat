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
      link: "/users",
    },

    {
      icon: <TiMessages />,
      label: "Messages",
      link: "/messages",
    },

    {
      icon: <PiUsersThree />,
      label: "Users",
      link: "/users",
    },

    {
      icon: <TiMessages />,
      label: "Messages",
      link: "/messages",
    },

    {
      icon: <PiUsersThree />,
      label: "Users",
      link: "/users",
    },

    {
      icon: <TiMessages />,
      label: "Messages",
      link: "/messages",
    },

    {
      icon: <FaGear />,
      label: "Settings",
      link: "/settings",
    },
  ];

  return (
    <div>
      <div>
        <img src={QuickChatLogo} alt="" />
      </div>

      <aside>
        {SidebarItems.map((item: any, index: number) => (
          <NavLink to={item?.link} key={index}>
            {item.label}
          </NavLink>
        ))}
      </aside>
    </div>
  );
};

export default Sidebar;
