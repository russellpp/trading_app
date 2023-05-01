import { Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import DashBoard from "./components/DashBoard";
import AlertModal from "./components/modals/AlertModal";
import { useSelector } from "react-redux";
import { selectError, selectStatus } from "./redux/requestStatusReducer";
import LoadingModal from "./components/modals/LoadingModal";
import SuccessModal from "./components/modals/SuccessModal";

function App() {
  const status = useSelector(selectStatus);
  return (
    <>
      {status.loading && <LoadingModal />}
      {status.error !== null && <AlertModal />}
      {status.success && <SuccessModal />}
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
