import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="mainscreen/*"></Route>
      </Routes>
    </>
  );
}

export default App;
