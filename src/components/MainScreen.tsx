import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainScreen() {
  return (
    <div>
      <h2>Main Screen</h2>
      <div className="flex gap-4">
        <div className="w-[250px] px-2 py-4 rounded-lg">
          <aside>
            <h2>Sidebar</h2>
          </aside>
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
