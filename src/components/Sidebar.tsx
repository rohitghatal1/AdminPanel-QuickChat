import { LuLayoutDashboard } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { TiMessages } from "react-icons/ti";
import { NavLink, useNavigate } from "react-router-dom";
import QuickChatLogo from "../assets/logo/QuickChat.png";
import { Button } from "antd";
import { CiLogout } from "react-icons/ci";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const SidebarItems = [
    {
      icon: <LuLayoutDashboard />,
      label: "Dashboard",
      link: "/mainscreen/dashboard",
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
  ];

  return (
    <div className="w-full h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-center h-[150px] w-full px-4 py-6 border-b border-gray-100">
        <img
          src={QuickChatLogo}
          alt="QuickChat Logo"
          className="h-full w-full"
        />
      </div>

      <nav className="flex-1 mt-6 px-3">
        <ul className="space-y-2">
          {SidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" />
                    )}

                    {/* Icon */}
                    <span
                      className={`text-lg ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-500 group-hover:text-gray-700"
                      }`}
                    >
                      {item.icon}
                    </span>

                    {/* Label */}
                    <span className="select-none">{item.label}</span>

                    {/* Hover effect */}
                    <div
                      className={`absolute inset-0 rounded-lg transition-all duration-200 ${
                        !isActive
                          ? "group-hover:bg-gradient-to-r group-hover:from-blue-50/50 group-hover:to-transparent"
                          : ""
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center mt-4">
          <Button
            danger
            className="flex items-center gap-1"
            onClick={() => {
              localStorage.removeItem("quickChatAminToken");
              navigate("/");
            }}
          >
            <CiLogout /> Logout
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
