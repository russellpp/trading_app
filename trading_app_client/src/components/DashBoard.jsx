import React, { useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import DashBody from "./dashboard/DashBody";

import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useTrader } from "../hooks/useTrader";
import {
  selectUserCryptos,
  setCryptos,
  setTransactions,
} from "../redux/userReducer";

function DashBoard() {
  const dispatch = useDispatch();
  const { getOwnedCoins, getTransactions } = useTrader();

  //updating cryptos and wallets
  useEffect(() => {
    //get cryptos
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

    //get transactions
  }, []);

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
