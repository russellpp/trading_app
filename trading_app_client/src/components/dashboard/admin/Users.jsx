import React, { useEffect } from "react";
import styled from "styled-components";
import UserSearch from "../boxes/UserSearch";
import UserFilter from "../boxes/UserFilter";
import UserListBox from "../boxes/UserListBox";
import UserTransactions from "../boxes/UserTransactions";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../redux/userReducer";
import {
  selectCurrentTrader,
  setTraderTransactions,
} from "../../../redux/adminReducer";
import { formatPrice } from "../../utils/UtilityFunctions";
import { useAdmin } from "../../../hooks/useAdmin";
import {
  clearAddUser,
  clearEditUser,
  selectAddUserModal,
  setAddUser,
  setEditUser,
} from "../../../redux/modalReducer";

function Users() {
  const dispatch = useDispatch();
  const { getUserTransactions } = useAdmin();
  const currentTrader = useSelector(selectCurrentTrader);
  const modalIsOpen = useSelector(selectAddUserModal);

  useEffect(() => {
    if (currentTrader) {
      getUserTransactions(currentTrader.id);
    }
  }, [currentTrader]);

  const handleAddUser = () => {
    if (!modalIsOpen) {
      dispatch(setAddUser());
    } else {
      dispatch(clearAddUser());
    }
  };

  const handleEditUser = () => {
    if (!modalIsOpen) {
      dispatch(setEditUser());
    } else {
      dispatch(clearEditUser());
    }
  };

  return (
    <UsersContainer>
      <ListContainer>
        <div>
          <h2>Users</h2>
          <button onClick={handleAddUser}>add user</button>
        </div>
        <UserSearch />
        <UserFilter />
        <UserListBox />
      </ListContainer>
      {currentTrader && (
        <UserProfile>
          <div>
            <h2>{currentTrader.email}</h2>
            <button onClick={handleEditUser}>edit user</button>
          </div>
          <div>
            <p>Phone number</p>
            <p>{currentTrader.phone_number}</p>
            <p>Wallet balance</p>
            <p>
              {currentTrader.balance
                ? formatPrice(parseFloat(currentTrader.balance))
                : `$ 0`}{" "}
              USD
            </p>
            <p>{currentTrader.approved ? "approved" : "pending approval"}</p>
            <p>{currentTrader.verified ? "verified" : "unverified"}</p>
          </div>
          <UserTransactions />
        </UserProfile>
      )}
    </UsersContainer>
  );
}

const UsersContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 50px;
  height: 100%;
  font-family: "RobotoReg";
`;

const ListContainer = styled.div`
  box-sizing: border-box;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--navyLight);
  border-radius: 20px;
  padding: 20px;
  margin-right: 10px;

  > div {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;

    > h2 {
      margin-left: 10px;
      font-size: 35px;
      color: var(--navyDarker);
      text-transform: uppercase;
      font-family: "Montserrat";
    }
    > button {
      height: 40px;
      margin-left: auto;
      margin-right: 10px;
      margin-top: 3px;
      border: none;
      border-radius: 10px;
      padding: 3px 15px;
      text-transform: uppercase;
      font-family: "Montserrat";
      font-weight: 600;
      background-color: var(--icterineDark);
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background-color: var(--blush);
        font-weight: 800;
        color: var(--icterine);
      }
    }
  }
`;

const UserProfile = styled.div`
  box-sizing: border-box;
  margin-left: 10px;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--navyLighter);
  border-radius: 20px;
  padding: 20px;
  > div:first-of-type {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;

    > h2 {
      margin-top: 5px;
      margin-left: 5px;
      font-size: 30px;
      color: var(--navyDarker);
      text-transform: uppercase;
      font-family: "Montserrat";
    }
    > button {
      height: 30px;
      margin-left: auto;
      margin-right: 10px;
      margin-top: 3px;
      border: none;
      border-radius: 10px;
      padding: 3px 15px;
      text-transform: uppercase;
      font-family: "Montserrat";
      font-weight: 600;
      background-color: var(--blush);
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        background-color: var(--blush);
        font-weight: 800;
        color: var(--icterine);
      }
    }
  }
  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    color: var(--magenta);
    > p {
      &:first-child {
        text-transform: uppercase;
        font-size: 14px;
        margin-left: 5px;
      }
      &:nth-child(2) {
        text-transform: uppercase;
        font-size: 25px;
        margin-left: 0px;
        margin-bottom: 10px;
        color: var(--magentaDark);
        font-weight: 400;
      }
      &:nth-child(3) {
        text-transform: uppercase;
        font-size: 14px;
        margin-left: 5px;
      }
      &:nth-child(4) {
        text-transform: uppercase;
        font-size: 25px;
        margin-left: 0px;
        margin-bottom: 10px;
        color: var(--magentaDark);
        font-weight: 400;
      }
      &:nth-child(5) {
        text-transform: uppercase;
        font-size: 20px;
        margin-left: 5px;
        margin-bottom: 5px;
        color: var(--magentaDark);
        font-weight: 400;
      }
      &:nth-child(6) {
        text-transform: uppercase;
        font-size: 20px;
        margin-left: 5px;
        margin-bottom: 15px;
        color: var(--magentaDark);
        font-weight: 400;
      }
    }
  }
  > div:last-of-type {
    background-color: var(--blushLighter);
  }
`;

export default Users;
