import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectFilteredTransactions,
  selectTransactionsList,
  setFilteredTransactions,
} from "../../../redux/adminReducer";
import { formatDate } from "../../utils/UtilityFunctions";

function TransactionsSearchbox() {
  const dispatch = useDispatch();
  const transactionsList = useSelector(selectTransactionsList);
  const filteredList = useSelector(selectFilteredTransactions);
  const [clickedOption, setClickedOption] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    const filtered = transactionsList.filter(
      (item) =>
        item.email.toLowerCase().includes(value) ||
        item.name.toLowerCase().includes(value) ||
        item.transaction_type.toLowerCase().includes(value) ||
        formatDate(item.created_at).toLowerCase().includes(value) ||
        item.ticker.toLowerCase().includes(value)
    );
    dispatch(setFilteredTransactions(filtered));
  };

  useEffect(() => {
    if (searchValue === "") {
      dispatch(setFilteredTransactions(transactionsList));
    }
  }, [searchValue]);

  return (
    <SearchContainer>
      <StyledInput
        placeholder="FILTER SEARCH: coin, ticker, trader email, buy/sell, date(DD-MM-YYYY), "
        value={searchValue.name}
        onChange={(event) => handleSearch(event)}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  overflow: unset;
  position: relative;
  font-family: "RobotoReg";
  width: 100%;
  margin-top: 10px;
  margin-bottom: 15px;

  input {
    border: none;
    outline: none;
    background-color: var(--blushLightest);
    font-size: 1rem;
    color: var(--navy);
    width: 95%;
    padding: 10px 20px;
    border-radius: 30px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
`;

const SearchResults = styled.div`
  overflow-y: scroll;
  overflow-x: unset;
  max-height: 600px;
  font-family: "RobotoReg";
  width: 95%;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  padding: 0px 10px;
  z-index: 9;
`;

const ResultItem = styled.div`
  overflow: unset;
  font-size: 1rem;
  padding: 10px 20px;
  background-color: ${({ isActive }) =>
    !isActive ? "var(--navyLighter)" : "var(--white)"};
  color: ${({ isActive }) =>
    !isActive ? "var(--white)" : "var(--navyLighter)"};
  cursor: pointer;

  &:hover {
    background-color: var(--navyLight);
  }
`;

export default TransactionsSearchbox;
