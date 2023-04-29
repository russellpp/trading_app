import { Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import DashBoard from "./components/DashBoard";
import AlertModal from "./components/modals/AlertModal";
import { useSelector } from "react-redux";
import { selectError } from "./redux/requestStatusReducer";

function App() {
  const errors = useSelector(selectError);
  return (
    <>
      {errors !== null && <AlertModal />}
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
