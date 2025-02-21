import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="mainscreen/*">
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
