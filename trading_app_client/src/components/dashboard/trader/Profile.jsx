import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TransactionBox from "../boxes/TransactionBox";
import { useSelector } from "react-redux";
import {
  selectUserCryptos,
  selectUserWallet,
} from "../../../redux/userReducer";
import {
  formatPrice,
  roundToSixSignificantFigures,
} from "../../utils/UtilityFunctions";
import CoinsListBox from "../boxes/CoinsListBox";

function Profile() {
  const wallet = useSelector(selectUserWallet);


 

  return (
    <ProfileContainer>
      <h2>Profile</h2>
      <UserCoins>
        <OwnedCryptos>
          <h2>Watchlist</h2>
          <CoinsListBox />
        </OwnedCryptos>
      </UserCoins>
      <UserProfile>
        <div>
          <h2>cucumber@lemon.com</h2>
          <h5>approved for trading</h5>
          <h3>wallet balance</h3>
          <h4>{wallet && formatPrice(wallet)} USD</h4>
          <h3>portfoliio value</h3>
          <h4>${`365949`} USD</h4>
        </div>
        <TransactionBox />
      </UserProfile>
    </ProfileContainer>
  );
}

const ProfileContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 50px;
  height: 100%;
  grid-template-areas:
    "title title"
    "user coin";
  grid-template-columns: 40% 60%;
  grid-template-rows: 8% 92%;
  > h2 {
    color: var(--icterine);
    grid-area: title;
    font-family: "Montserrat";
    text-transform: uppercase;
    font-size: 35px;
    margin-left: 30px;
  }
`;

const UserCoins = styled.div`
  grid-area: coin;
  display: flex;
  flex-direction: column;
  margin: 8px;
  background-color: var(--navy);
  border-radius: 20px;
  padding: 20px;
  font-family: "RobotoMed";
  color: var(--icterine);
`;
const UserProfile = styled.div`
  grid-area: user;
  display: flex;
  flex-direction: column;
  margin: 8px;
  background-color: var(--navyLighter);
  border-radius: 20px;
  padding: 20px;
  text-transform: uppercase;
  font-family: "RobotoReg";
  color: var(--icterine);

  > div:first-of-type {
    justify-self: flex-start;
    height: 28%;
    > h2 {
      color: var(--navyDark);
      font-size: 28px;
      font-family: "Montserrat";
    }
    > h5:first-of-type {
      font-size: 15px;
      margin-top: 3px;
      color: var(--magentaDark);
      margin-bottom: 15px;
    }
    > h3 {
      font-size: 12px;
      color: var(--navyDark);
    }
    > h4 {
      font-size: 27px;
      margin-bottom: 10px;
      color: var(--navyDarker);
    }
  }
  > div:nth-of-type(2) {
    background-color: var(--navyLight);
    height: 72%;
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 15px 15px;
    > h2 {
      height: 20%;
      color: var(--blushLighter);
    }
  }
`;
const OwnedCryptos = styled.div`
  box-sizing: content-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: flex-start;
  align-items: flex-start;
  >h2{
    margin-bottom: 20px;
  }
`;

export default Profile;
