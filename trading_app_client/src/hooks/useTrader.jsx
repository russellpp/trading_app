import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  setLoading,
  clearLoading,
  setError,
  setSuccess,
} from "../redux/requestStatusReducer";
import {
  selectUserDetails,
  selectUser,
  selectUserCryptos,
  setCryptos,
  setTransactions,
  setWallet,
} from "../redux/userReducer";
import { RAILS_API } from "../components/utils/Constants";
import { selectCurrentCoin, setCurrentCoin } from "../redux/coinReducer";

export const useTrader = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentCoin = useSelector(selectCurrentCoin);

  const trade = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/trade`, {
      method: "POST",
      body: JSON.stringify(details),
      headers,
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      getOwnedCoins();
      getTransactions();
      getBalance();
      dispatch(setCurrentCoin(currentCoin));
      dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      dispatch(setError(error.errors));
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const getCrypto = async (coinId) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(
      `${RAILS_API}/users/coins/${coinId}`,
      {
        method: "GET",
        headers,
      }
    );

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      // dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      // dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const getOwnedCoins = async () => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/users/coins`, {
      method: "GET",
      headers,
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("owned_cryptos", JSON.stringify(data));
      dispatch(setCryptos(data));
      // dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      // dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const getTransactions = async () => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(
      `${RAILS_API}/users/transactions`,
      {
        method: "GET",
        headers,
      }
    );

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("transactions", JSON.stringify(data));
      dispatch(setTransactions(data));
      // dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      // dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const getBalance = async () => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/users/${user?.user.id}`, {
      method: "GET",
      headers,
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data.user.balance);
      dispatch(setWallet(data.user.balance));
      // dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      // dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const updateWatchlist = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(
      `${RAILS_API}/users/update_watchlist`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(details),
      }
    );

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      dispatch(setSuccess(data.messages));
      getOwnedCoins();
      dispatch(setCurrentCoin(currentCoin));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      dispatch(setError(error.errors));
      dispatch(clearLoading());
    }
  };

  const addFunds = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/users/funds_transfers`, {
      method: "POST",
      headers,
      body: JSON.stringify(details),
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      getBalance();
      dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      console.log(error);
      dispatch(setError(error.errors));
      dispatch(clearLoading());
    }
  };

  return {
    trade,
    getCrypto,
    getOwnedCoins,
    getTransactions,
    getBalance,
    updateWatchlist,
    addFunds,
  };
};
