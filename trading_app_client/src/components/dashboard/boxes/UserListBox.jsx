import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectFilteredUsers,
  selectUserList,
  setCurrentTrader,
  setFilteredUsers,
} from "../../../redux/adminReducer";
import { formatPrice } from "../../utils/UtilityFunctions";

function UserListBox() {
  const dispatch = useDispatch();
  const userlist = useSelector(selectUserList);
  const filteredArray = useSelector(selectFilteredUsers);

  const handleItemClick = (item) => {
    dispatch(setCurrentTrader(item));
  };

  useEffect(() => {
    if (userlist) {
      dispatch(setFilteredUsers(userlist));
    }
  }, [userlist]);

  return (
    <Wrapper>
      <ul>
        {filteredArray?.map((item, index) => (
          <ListItem key={index} onClick={() => handleItemClick(item)}>
            <p>{item.email}</p>
            <p>{item.approved ? "approved" : "pending approval"}</p>
            <p>{item.verified ? "verified" : "unverified"}</p>
            <p>{item.id}</p>
            <p>{item.phone_number}</p>
            <p>
              Balance:{" "}
              {!item.balance ? "0" : formatPrice(parseFloat(item.balance))} USD
            </p>
          </ListItem>
        ))}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  width: fit-content;
  flex-grow: 1;
  background-color: var(--navyLighter);
  border: 2px solid var(--navy);
  height: 30px;
  border-radius: 20px;
  margin-top: 10px;
  padding: 10px;
  > ul {
    overflow-y: auto;
    list-style: none;
    padding: 0;
    width: 100%;
  }
`;

const ListItem = styled.li`
  padding-top: 5px;
  margin-top: 10px;
  display: grid;
  font-family: "RobotoReg";
  grid-template-areas:
    "id email approved verified"
    "id phone approved verified"
    "id balance approved verified";
  grid-template-columns: 5% 55% 20% 20%;
  grid-template-rows: 30px 30px 30px;
  text-transform: uppercase;
  font-size: 15px;
  > p {
    &:first-child {
      grid-area: email;
      font-family: "Montserrat";
      font-size: 18px;
      font-weight: 800;
    }
    &:nth-child(2) {
      margin-top: 3px;
      grid-area: approved;
      font-size: 14px;
      justify-self: center;
      font-family: "RobotoMed";
    }
    &:nth-child(3) {
      margin-top: 3px;
      font-size: 14px;
      grid-area: verified;
      justify-self: center;
      font-family: "RobotoMed";
    }
    &:nth-child(4) {
      grid-area: id;
      font-family: "RobotoMed";
      margin-left: 8px;
      margin-top: 3px;
      align-self: flex-start;
    }
    &:nth-child(5) {
      grid-area: phone;
      font-size: 20px;
    }
    &:nth-child(6) {
      grid-area: balance;
      text-transform: capitalize;
    }
  }
  &:hover {
    background-color: var(--icterineLight);
    cursor: pointer;
  }
`;

export default UserListBox;
