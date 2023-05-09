import React, { useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import DashBody from "./dashboard/DashBody";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useTrader } from "../hooks/useTrader";
import {
  selectUser,
  selectUserCryptos,
  setCryptos,
  setTransactions,
} from "../redux/userReducer";
import { useAdmin } from "../hooks/useAdmin";
import AdminReducer, {
  setAllTransactions,
  setUserList,
} from "../redux/adminReducer";
import { selectStatus } from "../redux/requestStatusReducer";

function DashBoard() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const status = useSelector(selectStatus);
  const { getOwnedCoins, getTransactions } = useTrader();
  const { getUserList, getAllTransactions } = useAdmin();

  // useEffect(() => {
  //   if (user?.isAdmin) {
  //     const userList = JSON.parse(localStorage.getItem("user_list"));
  //     if (!userList) {
  //       getUserList();
  //     } else {
  //       dispatch(setUserList(userList));
  //     }

  //     const transactionList = JSON.parse(
  //       localStorage.getItem("all_transactions")
  //     );
  //     if (!transactionList) {
  //       getAllTransactions();
  //     } else {
  //       dispatch(setAllTransactions(transactionList));
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (user?.isAdmin === false) {
  //     const cryptos = JSON.parse(localStorage.getItem("owned_cryptos"));
  //     if (!cryptos) {
  //       getOwnedCoins();
  //     } else {
  //       dispatch(setCryptos(cryptos));
  //     }

  //     const transactions = JSON.parse(localStorage.getItem("transactions"));
  //     if (!transactions) {
  //       getTransactions();
  //     } else {
  //       dispatch(setTransactions(transactions));
  //     }
  //   }
  // }, []);

  // //updating cryptos and wallets
  // useEffect(() => {
  //   if (!!user?.isAdmin) {
  //     const userList = JSON.parse(localStorage.getItem("user_list"));
  //     if (!userList) {
  //       getUserList();
  //     } else {
  //       dispatch(setUserList(userList));
  //     }

  //     const transactionList = JSON.parse(
  //       localStorage.getItem("all_transactions")
  //     );
  //     if (!transactionList) {
  //       getAllTransactions();
  //     } else {
  //       dispatch(setAllTransactions(transactionList));
  //     }
  //   } else if (user?.isAdmin === false) {
  //     const cryptos = JSON.parse(localStorage.getItem("owned_cryptos"));
  //     if (!cryptos) {
  //       getOwnedCoins();
  //     } else {
  //       dispatch(setCryptos(cryptos));
  //     }

  //     const transactions = JSON.parse(localStorage.getItem("transactions"));
  //     if (!transactions) {
  //       getTransactions();
  //     } else {
  //       dispatch(setTransactions(transactions));
  //     }
  //   }
  // }, [user]);

  return (
    <PageWrapper>
      <Sidebar />
      <DashBody />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export default DashBoard;
