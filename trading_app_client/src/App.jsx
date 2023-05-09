import { Routes, Route } from "react-router";
import HomePage from "./components/HomePage";
import DashBoard from "./components/DashBoard";
import AlertModal from "./components/modals/AlertModal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectLoading,
  selectStatus,
  setSuccess,
  setError,
} from "./redux/requestStatusReducer";
import LoadingModal from "./components/modals/LoadingModal";
import SuccessModal from "./components/modals/SuccessModal";
import { useEffect } from "react";
import {
  selectUser,
  selectUserDetails,
  userLogin,
  selectUserCryptos,
  setCryptos,
  setTransactions,
} from "./redux/userReducer";
import Cookies from "js-cookie";
import { goToDashboard, selectCurrentPage } from "./redux/navigationReducer";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAuth } from "./hooks/useAuth";
import { setAllCoins } from "./redux/coinReducer";
import { useCoin } from "./hooks/useCoin";
import {
  selectAddFundsModal,
  selectAddUserModal,
  selectEditUserModal,
  selectModalStatus,
} from "./redux/modalReducer";
import AddUserModal from "./components/modals/AddUserModal";
import { EditModalContainer } from "./components/modals/Modals";
import AdminReducer, {
  setAllTransactions,
  setUserList,
} from "./redux/adminReducer";
import { useTrader } from "./hooks/useTrader";
import { useAdmin } from "./hooks/useAdmin";
import EditUserModal from "./components/modals/EditUserModal";

function App() {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const { getAllCoins } = useCoin();
  const currentPage = useSelector(selectCurrentPage);
  const currentUser = useSelector(selectUser);
  const currentUserDetails = useSelector(selectUserDetails);
  const status = useSelector(selectStatus);
  const navigate = useNavigate();
  const loadingState = useSelector(selectLoading);
  const addUserModal = useSelector(selectAddUserModal);
  const editUserModal = useSelector(selectEditUserModal);
  const addFundsModal = useSelector(selectAddFundsModal);
  const modalStatus = useSelector(selectModalStatus);
  const { getOwnedCoins, getTransactions } = useTrader();
  const { getUserList, getAllTransactions } = useAdmin();

  // navigation hook
  useEffect(() => {
    if (currentPage === "login") {
      navigate("/home/login");
    } else if (currentPage === "home") {
      navigate("/home");
    } else if (currentPage === "register") {
      navigate("/home/register");
    } else if (currentPage === "verify") {
      navigate("/home/verify/input_code");
    } else if (currentPage === "verify_resend") {
      navigate("/home/verify");
    } else if (currentPage === "reset") {
      navigate("/home/reset");
    } else if (currentPage === "reset_code") {
      navigate("/home/reset/input_code");
    } else if (currentPage === "dashboard") {
      navigate("/dashboard");
    } else if (currentPage === "profile") {
      navigate("/dashboard/profile");
    } else if (currentPage === "user_trade") {
      navigate("/dashboard/trade");
    } else if (currentPage === "admin_users") {
      navigate("/dashboard/users");
    } else if (currentPage === "admin_transactions") {
      navigate("/dashboard/transactions");
    }
  }, [currentPage]);

  //check for logged in user
  useEffect(() => {
    console.log("relogging in");
    if (!currentUser.user) {
      const user = Cookies.get("user");
      if (user) {
        dispatch(userLogin(JSON.parse(user)));
        dispatch(goToDashboard());
      }
    }
  }, []);

  //fetch coin data
  useEffect(() => {
    console.log("fetching data");
    const coins = JSON.parse(localStorage.getItem("allCoins"));
    if (!coins) {
      getAllCoins();
    } else {
      dispatch(setAllCoins(coins));
    }
    if (currentUser?.isAdmin) {
      const userList = JSON.parse(localStorage.getItem("user_list"));
      if (!userList) {
        getUserList();
      } else {
        dispatch(setUserList(userList));
      }

      const transactionList = JSON.parse(
        localStorage.getItem("all_transactions")
      );
      if (!transactionList) {
        getAllTransactions();
      } else {
        dispatch(setAllTransactions(transactionList));
      }
    }
    if (currentUser?.isAdmin === false) {
      const cryptos = JSON.parse(localStorage.getItem("owned_cryptos"));
      if (!cryptos) {
        getOwnedCoins();
      } else {
        dispatch(setCryptos(cryptos));
      }

      const transactions = JSON.parse(localStorage.getItem("transactions"));
      if (!transactions) {
        getTransactions();
      } else {
        dispatch(setTransactions(transactions));
      }
    }
  }, [currentUserDetails]);

  //auto logout when cookie expires
  useEffect(() => {
    console.log("checking cookie expiration");
    const user = Cookies.get("user");
    if (!currentUser.user) {
      if (!user) {
        logout();
        dispatch(setError(["Login token expired, please login again."]));
      }
    }
  }, []);

  return (
    <>
      {status.loading && <LoadingModal />}
      {status.error !== null && <AlertModal />}
      {status.success && <SuccessModal />}
      {modalStatus.addUser && <AddUserModal />}
      {editUserModal && <EditUserModal />}
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/home/*" element={<HomePage />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </>
  );
}

export default App;
