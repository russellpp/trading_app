import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  formatBigNumber,
  formatChartData,
  formatPrice,
} from "../../utils/UtilityFunctions";
import CoinChart from "./CoinChart";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChartData,
  selectCurrentCoin,
  selectMarketData,
  selectExactPrice,
} from "../../../redux/coinReducer";
import { clearLoading, setLoading } from "../../../redux/requestStatusReducer";
import { useTrader } from "../../../hooks/useTrader";

function CoinData() {
  const currentCoin = useSelector(selectCurrentCoin);
  const currentPrice = useSelector(selectExactPrice);

  const marketData = useSelector(selectMarketData);
  const chartData = useSelector(selectChartData);
  const dispatch = useDispatch();

  const {updateWatchlist} = useTrader()

  const [priceData, setPriceData] = useState();
  const [coinInfo, setCoinInfo] = useState();
  const [price, setPrice] = useState(null);
  useEffect(() => {
    const dataArray = chartData;

    if (dataArray) {
      dispatch(setLoading());
      setPriceData(formatChartData(dataArray));
      dispatch(clearLoading());
    }
  }, [chartData]);

  useEffect(() => {
    if (marketData && marketData.length > 0) {
      setCoinInfo(marketData[0]);
    }
  }, [marketData]);

  const handleAddToWatchlist = () => {
    const details = {
      watchlist: {
        gecko_id: currentCoin.gecko_id,
        on_watchlist: true,
      },
    };
    updateWatchlist(details);
  };

  if (!currentCoin) {
    return null;
  }

  return (
    <DataWrapper>
      <CoinPrice>
        <p>{coinInfo?.id}</p>
        <p>{coinInfo?.symbol}</p>
        <p>{currentPrice && formatPrice(currentPrice)}</p>
        <p>USD</p>
      </CoinPrice>
      <PriceChartWrapper>
        {priceData && <CoinChart data={priceData} />}
      </PriceChartWrapper>
      <CoinMiscData>
        <div>
          <p>Market Cap</p>
          <p>{coinInfo && formatBigNumber(coinInfo?.market_cap)}</p>
        </div>
        <div>
          <p>{`High (24h)`}</p>
          <p>{coinInfo && formatPrice(coinInfo?.high_24h)}</p>
        </div>
        <div>
          <p>{`Volume (24h)`}</p>
          <p>{coinInfo && formatBigNumber(coinInfo?.total_volume)}</p>
        </div>
        <div>
          <p>{`Low (24h)`}</p>
          <p>{coinInfo && formatPrice(coinInfo?.low_24h)}</p>
        </div>
        <button onClick={handleAddToWatchlist}>add to watchlist</button>
      </CoinMiscData>
    </DataWrapper>
  );
}

const DataWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CoinPrice = styled.div`
  box-sizing: border-box;
  padding: 10px 40px;
  display: flex;
  height: 15%;
  width: inherit;
  font-family: "RobotoMed";
  p {
    font-size: 15px;
    margin: 0;
    &:first-child {
      font-family: "Montserrat";
      color: var(--icterineDark);
      font-size: 40px;
      text-transform: uppercase;
      font-weight: 600;
    }
    &:nth-child(2) {
      margin-left: 10px;
      margin-top: 10px;
      font-family: "Montserrat";
      text-transform: uppercase;
      color: var(--navyLighter);
    }
    &:nth-child(3) {
      color: var(--icterine);
      margin-top: 10px;
      font-size: 35px;
      margin-left: auto;
    }
    &:nth-child(4) {
      color: var(--navyLighter);
      margin-left: 5px;
      margin-top: 27px;
      margin-right: 50px;
    }
  }
`;
const PriceChartWrapper = styled.div`
  height: 70%;
  width: inherit;
`;
const CoinMiscData = styled.div`
  box-sizing: border-box;
  padding: 0px 40px;
  display: grid;
  height: 15%;
  width: inherit;
  grid-template-areas:
    "a b e"
    "c d e";
  grid-template-columns: 30% 30% 40%;
  grid-template-rows: 1fr 1fr;
  color: var(--buffLighter);
  div {
    p {
      &:first-child {
        font-size: 10px;
        color: var(--navyLighter);
        text-transform: uppercase;
      }
      &:nth-child(2) {
        font-size: 18px;
      }
    }

    &:first-child {
      grid-area: a;
    }
    &:nith-child(2) {
      grid-area: b;
    }
    &:nith-child(3) {
      grid-area: c;
    }
    &:nith-child(4) {
      grid-area: d;
    }
  }
  button {
    grid-area: e;
    height: 70px;
    width: 200px;
    margin-top: 5px;
    margin-bottom: 16px;
    margin-left: auto;
    margin-right: auto;
    padding: 8px;
    border-radius: 25px;
    border: none;
    background-color: var(--icterineDarker);
    color: white;
    font-size: 18px;
    font-family: "Montserrat";
    font-weight: 600;
    text-transform: uppercase;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: var(--icterineDark);
      color: var(--navyDark);
      font-weight: 700;
      scale: 1.1;
      font-size: 20px;
    }
  }
`;

export default CoinData;
