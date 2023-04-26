import { Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
