import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function MainScreen() {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-[20%] h-screen rounded-lg">
          <Sidebar />
        </div>

        <div className="rounded-lg w-[80%]">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
