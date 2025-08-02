import { Outlet } from "react-router-dom";
// import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function MainScreen() {
  const [smallSidebar, setSmallSidebar] = useState<boolean>(false);

  return (
    <div>
      <h2 className="text-left py-2 font-semibold">Main Screen</h2>

      <div className="flex gap-4">
        <div className="min-w-[250px] h-screen px-2 py-4 rounded-lg bg-gray-400 relative">
          <Sidebar />

          <div
            className={`absolute top-0 right-0 border border-gray-200 rounded-md p-2 text-teal-400 ${
              smallSidebar ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setSmallSidebar(true)}
          >
            <MdKeyboardDoubleArrowLeft />
          </div>
        </div>

        <div className="rounded-lg">
          {/* <div className="h-[50px] py-2">
            <Header />
          </div> */}

          <div className="h-[calc(100%-50px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
