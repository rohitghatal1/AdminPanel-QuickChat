import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";

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
  ];
  return (
    <div>
      <h2>QuickChat</h2>
    </div>
  );
};

export default Sidebar;
