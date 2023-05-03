import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllCoins, setCurrentCoin } from "../../../redux/coinReducer";

function CoinSearch() {
  const coins = useSelector(selectAllCoins);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [clickedOption, setClickedOption] = useState(null);

  useEffect(() => {
    dispatch(setCurrentCoin(clickedOption));
  }, [clickedOption]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    setShowResults(value !== "");
    const filtered = coins.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.ticker.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleOptionClick = (value) => {
    setSearchValue(value);
    setClickedOption(value);
    setShowResults(false);
  };

  return (
    <SearchContainer>
      <StyledInput
        placeholder="Search coins"
        value={searchValue.name}
        onChange={(event) => handleSearch(event)}
      />
      {showResults && (
        <SearchResults>
          {filteredData.map((result) => (
            <ResultItem
              key={result.id}
              onClick={() => handleOptionClick(result)}
              isActive={result === clickedOption}
            >
              {result.name} ({result.ticker})
            </ResultItem>
          ))}
        </SearchResults>
      )}
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

export default CoinSearch;
