import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectUser,
  selectUserCryptos,
  selectUserTransactions,
} from "../../redux/userReducer";
import { useNavigate } from "react-router";
import {
  goToDashCoins,
  goToDashProfile,
  goToDashUserTrade,
  selectCurrentPage,
} from "../../redux/navigationReducer";
import { useAuth } from "../../hooks/useAuth";
import { useCoin } from "../../hooks/useCoin";
import {
  selectAllCoins,
  selectChartData,
  selectCurrentCoin,
  selectExactPrice,
  selectMarketData,
} from "../../redux/coinReducer";
import { setSuccess } from "../../redux/requestStatusReducer";
import { CancelButton } from "../modals/Modals";
import {
  selectTradeTransactionType,
  switchType,
} from "../../redux/tradeReducer";
import { useTrader } from "../../hooks/useTrader";

function Sidebar() {
  const currentUser = useSelector(selectUser);
  const chartData = useSelector(selectChartData);
  const coins = useSelector(selectAllCoins);
  const ownedCoins = useSelector(selectUserCryptos);
  const transactionType = useSelector(selectTradeTransactionType);
  const trans = useSelector(selectUserTransactions);
  const currentCoin = useSelector(selectCurrentCoin);
  const exactPrice = useSelector(selectExactPrice);
  const marketData = useSelector(selectMarketData);
  const { getAllCoins, getMarketData, getCoinHistoricalPrice, getExactPrice } =
    useCoin();
  const { logout } = useAuth();
  const { getCrypto, getBalance, updateWatchlist } = useTrader();
  const navigate = useNavigate();
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();
  const [options, setOptions] = useState(["Hello", "Maria"]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = () => {
    console.log(coins.find((item) => item.gecko_id === "bitcoin"));
  };

  const handleLogout = () => {
    logout();
    dispatch(setSuccess(["Successfully logged out!"]));
  };

  const handleItemClick = (index) => {
    if (!currentUser.isAdmin) {
      if (index === 0) {
        dispatch(goToDashProfile());
      } else if (index === 1) {
        dispatch(goToDashUserTrade());
      }
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (!currentUser.isAdmin) {
      if (currentPage !== "user_trade") {
        setActiveIndex(0);
      } else {
        setActiveIndex(1);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    if (!currentUser.isAdmin) {
      setOptions(["Profile", "Trade"]);
    } else {
      setOptions(["Users", "Trade", "Transactions", "Coins"]);
    }
  }, []);

  return (
    <SideBarWrapper>
      <button onClick={handleClick} />
      <div>
        <img src="/src/assets/icon-crop-navy.svg" alt="icon" />
        <h3>COIN·SWIFT</h3>
      </div>

      <ul>
        {options?.map((option, index) => {
          return (
            <li
              key={index}
              onClick={() => handleItemClick(index)}
              style={{
                backgroundColor:
                  activeIndex === index ? "var(--navy)" : "var(--buff)",
                color:
                  activeIndex === index ? "var(--buffLighter)" : "var(--navy)",
              }}
            >
              {option}
            </li>
          );
        })}
      </ul>
      <CancelButton onClick={handleLogout} className="cancel-button">
        logout
      </CancelButton>
    </SideBarWrapper>
  );
}

const SideBarWrapper = styled.div`
  box-sizing: content-box;
  height: 100%;
  width: 200px;
  background-color: var(--buff);
  color: white;
  font-family: "RobotoBold";
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  justify-content: flex-start;
  align-items: center;
  text-transform: uppercase;
  padding: 20px 15px;
  & > div:first-of-type {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
    pointer-events: none;

    > img {
      height: 50px;
      margin-right: 10px;
    }
    > h3 {
      font-family: "SanGiuseppe";
      letter-spacing: 3px;
      font-weight: 800;
      color: var(--navy);
    }
  }
  > ul {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    align-items: center;
    font-size: 20px;
    color: var(--navy);
    letter-spacing: 1px;
    > li {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      height: 50px;
      width: 90%;
      text-align: center;
      transition: 0.3s;
      border-radius: 30px;
      &:hover {
        background-color: var(--navy) !important;
        cursor: pointer;
        color: var(--buffLighter) !important;
      }
    }
  }
  > button:last-of-type {
    position: absolute;
    bottom: 20px;
  }
`;

export default Sidebar;
