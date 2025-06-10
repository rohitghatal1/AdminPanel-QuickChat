import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainScreen() {
  return (
    <div>
      <h2 className="text-left py-2 font-semibold">Main Screen</h2>

      <div className="flex gap-4">
        <div className="min-w-[250px] h-screen px-2 py-4 rounded-lg bg-gray-400">
          <Sidebar />
        </div>

        <div className="rounded-lg">
          <div className="h-[50px] py-2">
            <Header />
          </div>

          <div className="h-[calc(100%-50px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
