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
  goToDashAdminTransactions,
  goToDashAdminUsers,
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
import { useAdmin } from "../../hooks/useAdmin";
import {
  selectCurrentTrader,
  selectFilteredTransactions,
  selectFilteredUsers,
  selectTraderTransactions,
  selectUserList,
} from "../../redux/adminReducer";
import { selectAddUserModal } from "../../redux/modalReducer";

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
  const userlist = useSelector(selectUserList);
  const filteredusers = useSelector(selectFilteredUsers);
  const [options, setOptions] = useState(["Hello", "Maria"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { getUserList, getAllTransactions, getUserTransactions } = useAdmin();
  const currentTrader = useSelector(selectCurrentTrader);
  const traderTransactions = useSelector(selectTraderTransactions);
  const adduser = useSelector(selectAddUserModal);
  const filteredtrans = useSelector(selectFilteredTransactions);

  const handleClick = () => {
    console.log(filteredtrans);
  };

  const handleLogout = () => {
    logout();
    dispatch(setSuccess(["Successfully logged out!"]));
  };

  const handleLink = () => {
    window.location.href = "https://www.coingecko.com/en/api";
  };

  const handleItemClick = (index) => {
    if (!currentUser.isAdmin) {
      if (index === 0) {
        dispatch(goToDashProfile());
      } else if (index === 1) {
        dispatch(goToDashUserTrade());
      }
    } else {
      if (index === 0) {
        dispatch(goToDashAdminUsers());
      } else if (index === 1) {
        dispatch(goToDashAdminTransactions());
      }
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    if (!currentUser.isAdmin) {
      if (currentPage !== "user_trade") {
        setActiveIndex(0);
      } else {
        setActiveIndex(1);
      }
    } else {
      if (currentPage !== "admin_transactions") {
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
      setOptions(["Users", "Transactions"]);
    }
  }, [currentUser]);

  return (
    <SideBarWrapper>
      {/* <button onClick={handleClick} /> */}
      <div>
        <img src="./public/assets/icon-crop-navy.svg" alt="icon" />
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
                  activeIndex === index ? "var(--navy)" : "var(--blushLighter)",
                color:
                  activeIndex === index ? "var(--blushLighter)" : "var(--navy)",
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
      <span onClick={handleLink}>Powered by CoinGecko API</span>
    </SideBarWrapper>
  );
}

const SideBarWrapper = styled.div`
  box-sizing: content-box;
  height: 100%;
  width: 200px;
  background-color: var(--magentaLight);
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
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: auto;
    align-items: center;
    pointer-events: none;

    > img {
      height: 90px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    > h3 {
      font-family: "SanGiuseppe";
      font-size: 30px;
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
    bottom: 60px;
    padding: 10px 20px;
    border-radius: 20px;
  }
  > span {
    font-family: "RobotoReg";
    color: var(--navy);
    text-transform: none;
    position: absolute;
    bottom: 20px;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      color: var(--magenta);
    }
  }
`;

export default Sidebar;
