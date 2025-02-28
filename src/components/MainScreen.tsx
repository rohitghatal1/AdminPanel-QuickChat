import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function MainScreen() {
  return (
    <div>
      <h2>Main Screen</h2>
      <div className="flex">
        <div>
          <aside>
            <h2>Sidebar</h2>
          </aside>
        </div>
        <div>
          <div>
            <Header />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
