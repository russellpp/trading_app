import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectFilteredUsers,
  selectUserList,
  setFilteredUsers,
} from "../../../redux/adminReducer";

function UserFilter() {
  const dispatch = useDispatch();
  const userlist = useSelector(selectUserList);
  const filteredList = useSelector(selectFilteredUsers);
  const [filter, setFilter] = useState({
    approved: false,
    verified: false,
    nonzero: false,
    pending: false,
    unverified: false,
  });

  useEffect(() => {
    const applyFilter = () => {
      let filtered = userlist;

      if (filter.approved) {
        filtered = filtered.filter((user) => user.approved);
      }
      if (filter.verified) {
        filtered = filtered.filter((user) => user.verified);
      }
      if (filter.nonzero) {
        filtered = filtered.filter((user) => {
          const balance =
            user.balance !== null ? parseFloat(user.balance) : null;
          return balance !== null && balance !== 0;
        });
      }
      if (filter.pending) {
        filtered = filtered.filter((user) => !user.approved);
      }
      if (filter.unverified) {
        filtered = filtered.filter((user) => !user.verified);
      }

      dispatch(setFilteredUsers(filtered));
    };

    applyFilter();
  }, [filter, userlist]);

  const handleClick = (option) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [option]: !prevFilter[option],
    }));
  };

  return (
    <Wrapper>
      <p>Filter by:</p>

      <FilterOption
        active={filter.approved}
        onClick={() => handleClick("approved")}
      >
        <span>approved</span>
      </FilterOption>
      <FilterOption
        active={filter.pending}
        onClick={() => handleClick("pending")}
      >
        <span>pending approval</span>
      </FilterOption>
      <FilterOption
        active={filter.verified}
        onClick={() => handleClick("verified")}
      >
        <span>verified</span>
      </FilterOption>
      <FilterOption
        active={filter.unverified}
        onClick={() => handleClick("unverified")}
      >
        <span>unverified</span>
      </FilterOption>
      <FilterOption
        active={filter.nonzero}
        onClick={() => handleClick("nonzero")}
      >
        <span>non-zero balance</span>
      </FilterOption>
    </Wrapper>
  );
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

export default UserFilter;
