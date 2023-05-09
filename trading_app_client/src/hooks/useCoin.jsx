import Cookies from "js-cookie";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { COIN_API, RAILS_API } from "../components/utils/Constants";
import {
  setLoading,
  clearLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
  selectError,
} from "../redux/requestStatusReducer";
import {
  clearResendDetails,
  selectLoginDetails,
  selectUser,
  setLoginDetails,
  setResendDetails,
  userLogin,
} from "../redux/userReducer";
import {
  selectCurrentCoin,
  setAllCoins,
  setChartData,
  setExactPrice,
  setMarketData,
} from "../redux/coinReducer";

export const useCoin = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const authorization = currentUser.token;
  const currentCoin = useSelector(selectCurrentCoin);

  const getAllCoins = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${authorization}`);

    const request = new Request(`${RAILS_API}/cryptos`, {
      method: "GET",
      headers,
    });

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("allCoins", JSON.stringify(data.cryptos));
      dispatch(setAllCoins(data.cryptos));
      dispatch(clearLoading());
    } else {
      const data = await response.json();
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const getMarketData = async (ids) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const idString = ids.join(",");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(
      `${COIN_API}coins/markets?vs_currency=usd&ids=${idString}`,
      {
        method: "GET",
        headers,
      }
    );

    console.log(request)
    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("current_coin_market_data", JSON.stringify(data));
      dispatch(setMarketData(data));
      dispatch(clearLoading());
    } else {
      const data = await response.json();
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const getCoinHistoricalPrice = async (id) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(
      `${COIN_API}coins/${id}/market_chart?vs_currency=usd&days=5`,
      {
        method: "GET",
        headers,
      }
    );

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("current_coin_prices", JSON.stringify(data));
      dispatch(
        setChartData(
          JSON.parse(localStorage.getItem("current_coin_prices")).prices
        )
      );
      dispatch(clearLoading());
    } else {
      const data = await response.json();
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const getExactPrice = async (id) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(
      `${COIN_API}simple/price?ids=${id}&vs_currencies=usd&precision=12`,
      {
        method: "GET",
        headers,
      }
    );

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("current_coin_exact_price", JSON.stringify(data));
      dispatch(setExactPrice(data[currentCoin?.gecko_id].usd))
      dispatch(clearLoading());
    } else {
      const data = await response.json();
      dispatch(clearLoading());
      console.log(data);
    }
  };

  return { getAllCoins, getMarketData, getCoinHistoricalPrice, getExactPrice };
};
