import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectFilteredTransactions,
  selectTransactionsList,
} from "../../../redux/adminReducer";

function TransactionsFilter() {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactionsList);
  const filteredList = useSelector(selectFilteredTransactions);
  const [filter, setFilter] = useState({
    buy: false,
    sell: false,
    today: false,
  });

  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 35px;
  border-radius: 20px;
  margin-top: 10px;
  padding: 5px;
  > p {
    margin-right: 15px;
    margin-left: 5px;
    font-weight: 800;
    margin-top: 3px;
  }
`;

const FilterOption = styled.div`
  padding: 5px 10px;

  background-color: ${({ active }) =>
    active ? "var(--blushDark)" : "var(--navyDark)"};
  color: ${({ active }) => (active ? "var(--icterine)" : "var(--navyLighter)")};
  font-family: "RobotoMed";
  margin-right: 15px;
  text-transform: uppercase;
  font-size: 14px;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: var(--blush);
    color: var(--icterine);
  }
`;

export default TransactionsFilter;
