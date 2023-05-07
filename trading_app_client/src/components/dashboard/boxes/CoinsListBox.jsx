import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { selectUserCryptos } from "../../../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useCoin } from "../../../hooks/useCoin";
import {
  selectAllCoins,
  selectMarketData,
  setCurrentCoin,
} from "../../../redux/coinReducer";
import { formatBigNumber, formatPrice } from "../../utils/UtilityFunctions";
import { goToDashUserTrade } from "../../../redux/navigationReducer";

function CoinsListBox() {
  const ownedCoins = useSelector(selectUserCryptos);
  const allCoins = useSelector(selectAllCoins);
  const dispatch = useDispatch();
  const { getMarketData } = useCoin();
  const dataArray = useSelector(selectMarketData);

  const handleCoinItemClick = (gecko_id) => {
    console.log(gecko_id);
    const coin = allCoins.find((item) => item.gecko_id === gecko_id);
    dispatch(setCurrentCoin(coin));
    dispatch(goToDashUserTrade());
    console.log(coin);
  };

  useEffect(() => {
    if (ownedCoins) {
      const ids = ownedCoins.cryptos.map((coin) => coin.gecko_id);
      getMarketData(ids);
    }
  }, [ownedCoins]);

  return (
    <ListWrapper>
      <ul>
        {dataArray?.map((data, index) => (
          <CoinItem key={index} onClick={() => handleCoinItemClick(data.id)}>
            <p>{data.name}</p>
            <p>{data.symbol}</p>
            <p>{formatPrice(data.current_price)}</p>
            <p>{data.price_change_percentage_24h}%</p>

            <p>market cap</p>
            <p>{formatBigNumber(data.market_cap)}</p>
            <p>high</p>
            <p>{formatPrice(data.high_24h)}</p>

            <p>volume (24h)</p>
            <p>{formatBigNumber(data.total_volume)}</p>
            <p>low</p>
            <p>{formatPrice(data.low_24h)}</p>

            <p>
              {" "}
              {parseFloat(
                ownedCoins?.cryptos.find((item) => item.gecko_id === data.id)
                  .quantity
              ) !== 0
                ? "OWNED"
                : "FOLLOWING"}
            </p>
            <p>
              {parseFloat(
                ownedCoins?.cryptos.find((item) => item.gecko_id === data.id)
                  .quantity
              ) !== 0
                ? ownedCoins?.cryptos.find((item) => item.gecko_id === data.id)
                    .quantity
                : ""}
            </p>
          </CoinItem>
        ))}
      </ul>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  height: 800px;
  width: inherit;
  overflow-y: auto;
  > ul {
    list-style: none;
    padding: 0px;
    margin-top: 10px;
    height: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-evenly;
    overflow-y: auto;
  }
`;

const CoinItem = styled.li`
  box-sizing: content-box;
  padding: 20px;
  border-radius: 20px;
  background-color: var(--blushLight);
  height: 140px;
  width: auto;
  min-width: 280px;
  display: grid;
  align-items: center;
  text-transform: uppercase;
  grid-template-areas:
    "name name name ticker"
    "price price price pricechange"
    "space space space space"
    "info1 value1 info2 value2"
    "info3 value3 info4 value4"
    "space2 space2 space2 space2"
    "owned qty qty qty";
  grid-template-rows: 33% 22% 5% 10% 10% 3% 17%;
  grid-template-columns: 35% 30% 12% 23%;
  > p {
    &:first-child {
      grid-area: name;
      font-size: 42px;
      font-family: "Montserrat";
      font-weight: 600;
      align-self: flex-start;
      color: var(--navyDark);
    }
    &:nth-child(2) {
      grid-area: ticker;
      margin-top: 5px;
      font-size: 20px;
      font-weight: 600;
      font-family: "Montserrat";
      justify-self: flex-end;
      align-self: flex-start;
      color: var(--navyDark);
    }
    &:nth-child(3) {
      grid-area: price;
      font-weight: 600;
      font-family: "Montserrat";
      font-size: 25px;
      color: var(--navy);
    }
    &:nth-child(4) {
      grid-area: pricechange;
      font-weight: 600;
      font-family: "Montserrat";
      font-size: 15px;
      justify-self: flex-end;
      color: var(--navy);
    }
    &:not(:first-child):not(:nth-child(2)):not(:nth-child(3)):not(
        :nth-child(4)
      ) {
      color: var(--blushDarker);
      font-family: "RobotoReg";
      font-size: 12px;
    }
    &:nth-child(5) {
      grid-area: info1;
    }
    &:nth-child(6) {
      grid-area: value1;
      font-size: 15px !important;
      font-family: "RobotoMed" !important;
    }
    &:nth-child(7) {
      grid-area: info2;
    }
    &:nth-child(8) {
      grid-area: value2;
      font-size: 15px !important;
      font-family: "RobotoMed" !important;
    }
    &:nth-child(9) {
      grid-area: info3;
    }
    &:nth-child(10) {
      grid-area: value3;
      font-size: 15px !important;
      font-family: "RobotoMed" !important;
    }
    &:nth-child(11) {
      grid-area: info4;
    }
    &:nth-child(12) {
      grid-area: value4;
      font-size: 15px !important;
      font-family: "RobotoMed" !important;
    }
    &:nth-child(13) {
      grid-area: owned;
      font-size: 20px !important;
      font-family: "RobotoMed" !important;
      color: var(--navy) !important;
    }
    &:nth-child(14) {
      grid-area: qty;
      font-size: 20px !important;
      font-family: "RobotoMed" !important;
      color: var(--navy) !important;
    }
  }
  &:hover {
    background-color: var(--navyLighter);
    cursor: pointer;
  }
`;

export default CoinsListBox;
