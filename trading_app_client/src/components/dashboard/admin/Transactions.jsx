import React from "react";
import styled from "styled-components";
import TransactionsFilter from "../boxes/TransactionsFilter";
import TransactionsSearchbox from "../boxes/TransactionsSearchbox";
import IndexTransactions from "../boxes/IndexTransactions";

function Transactions() {
  return (
    <TransactionsContainer>
      <div>
        <p>Transactions</p>
        <TransactionsSearchbox />
        <IndexTransactions />
      </div>
    </TransactionsContainer>
  );
}
const TransactionsContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 50px;
  height: 100%;
  font-family: "RobotoReg";
  > div {
    &:first-child {
      box-sizing: border-box;
      margin-left: 10px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: var(--navyLighter);
      border-radius: 20px;
      padding: 20px;
    }
    > p {
      margin-top: 5px;
      margin-bottom: 5px;
      margin-left: 5px;
      height: 50px;
      font-size: 30px;
      color: var(--navyDarker);
      text-transform: uppercase;
      font-family: "Montserrat";
      > div:last-of-type {
        flex-grow: 1;
      }
    }
  }
`;

export default Transactions;
