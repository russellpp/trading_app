import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectCurrentTrader,
  selectFilteredUsers,
  selectUserList,
  setCurrentTrader,
  setFilteredUsers,
} from "../../../redux/adminReducer";

function UserSearch() {
  const dispatch = useDispatch();
  const userlist = useSelector(selectUserList);
  const users = useSelector(selectFilteredUsers);
  const currentTrader = useSelector(selectCurrentTrader);
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [clickedOption, setClickedOption] = useState(null);

  useEffect(() => {
    dispatch(setCurrentTrader(clickedOption));
  }, [clickedOption]);

  useEffect(() => {
    if (currentTrader) {
      setSearchValue(currentTrader);
      setClickedOption(currentTrader);
      setShowResults(false);
    }
  }, [currentTrader]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    setShowResults(value !== "");
    const filtered = users.filter(
      (item) =>
        item.email.toLowerCase().includes(value) ||
        item.phone_number.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    dispatch(setFilteredUsers(filtered));
  };

  useEffect(() => {
    if (searchValue === "") {
      dispatch(setFilteredUsers(userlist));
    }
  }, [searchValue]);

  return (
    <SearchContainer>
      <StyledInput
        placeholder="Search users"
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

  input {
    border: none;
    outline: none;
    background-color: var(--navyLighter);
    font-size: 1rem;
    color: var(--white);
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

export default UserSearch;
