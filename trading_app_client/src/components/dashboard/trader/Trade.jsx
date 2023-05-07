import React, { useEffect } from "react";
import styled from "styled-components";
import CoinSearch from "../boxes/CoinSearch";
import CoinData from "../boxes/CoinData";
import { useDispatch, useSelector } from "react-redux";
import { useCoin } from "../../../hooks/useCoin";
import { selectCurrentCoin, setChartData } from "../../../redux/coinReducer";
import { clearLoading, setLoading } from "../../../redux/requestStatusReducer";
import TradeBox from "../boxes/TradeBox";

function Trade() {
  const currentCoin = useSelector(selectCurrentCoin);
  const dispatch = useDispatch();
  const { getAllCoins, getMarketData, getCoinHistoricalPrice, getExactPrice } =
    useCoin();
  
    useEffect(() => {
    if (currentCoin) {
      dispatch(setLoading());
      getCoinHistoricalPrice(currentCoin.gecko_id);
      getMarketData([currentCoin.gecko_id]);
      getExactPrice(currentCoin.gecko_id);
      dispatch(clearLoading());
    }
  }, [currentCoin]);

  
 
  
  return (
    <TradeContainer>
      <h2>Trade</h2>
      <Header>
        <CoinSearch />
      </Header>
      <Body>
        <CoinData />
      </Body>
      <TradeBox />
    </TradeContainer>
  );
}

const TradeContainer = styled.div`
  display: grid;
  box-sizing: border-box;
  padding: 50px;
  height: 100%;
  grid-template-areas:
    "title title"
    "search trade"
    "coin trade";
  grid-template-columns: 70% 30%;
  grid-template-rows: 8% 12% 80%;
  > h2 {
    color: var(--icterine);
    grid-area: title;
    font-family: "Montserrat";
    text-transform: uppercase;
    font-size: 35px;
    margin-left: 30px;
  }
`;

const Header = styled.div`
  overflow: unset;
  box-sizing: content-box;
  display: flex;
  grid-area: search;
  margin: 8px;
  background-color: var(--navy);
  border-radius: 20px;
  padding: 20px;
  position: relative;
`;

const Body = styled.div`
  grid-area: coin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: 8px;
  background-color: var(--navy);
  border-radius: 20px;
  padding: 20px;
  font-family: "RobotoMed";
  color: var(--icterine);
`;

export default Trade;
