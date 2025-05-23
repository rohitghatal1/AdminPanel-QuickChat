import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/pages/Dashboard";
import Users from "./components/pages/Users";
import Messages from "./components/pages/Messages";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="mainscreen/*" element={<MainScreen />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="messages" element={<Messages />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
