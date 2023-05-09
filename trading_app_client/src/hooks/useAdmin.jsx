import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  clearSuccess,
  setLoading,
  clearLoading,
  setError,
  setSuccess,
} from "../redux/requestStatusReducer";
import { selectUser } from "../redux/userReducer";
import { RAILS_API } from "../components/utils/Constants";
import { selectCurrentTrader, setAllTransactions, setTraderTransactions, setUserList } from "../redux/adminReducer";

export const useAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentTrader = useSelector(selectCurrentTrader)

  const getUserList = async () => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/admin/index`, {
      method: "GET",
      headers,
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status < 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user_list", JSON.stringify(data?.traders));
      dispatch(setUserList(data?.traders));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const getUserTransactions = async (trader_id) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/transactions/${trader_id}`, {
      method: "GET",
      headers,
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status < 300) {
      const data = await response.json();
      console.log(data);
      dispatch(setTraderTransactions(data));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const getAllTransactions = async () => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/transactions`, {
      method: "GET",
      headers,
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status < 300) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem(
        "all_transactions",
        JSON.stringify(data?.transactions)
      );
      dispatch(setAllTransactions(data?.transactions));
      dispatch(clearLoading());
    } else {
      const error = await response.json();
      dispatch(clearLoading());
      console.log(error);
    }
  };

  const createTrader = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/admin/create_trader`, {
      method: "POST",
      headers,
      body: JSON.stringify(details)
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status < 300) {
      const data = await response.json();
      console.log(data);
      dispatch(clearLoading());
      dispatch(setSuccess(data.status))
    } else {
      const error = await response.json();
      dispatch(clearLoading());
      dispatch(setError(error.errors))
      console.log(error);
    }
  };

  const updateTrader = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${user?.token}`);

    const request = new Request(`${RAILS_API}/admin/update/${currentTrader?.id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(details)
    });

    console.log(request);

    const response = await fetch(request);
    if (response.status < 300) {
      const data = await response.json();
      console.log(data);
      dispatch(clearLoading());
      dispatch(setSuccess(data.status))
    } else {
      const error = await response.json();
      dispatch(clearLoading());
      dispatch(setError(error.errors))
      console.log(error);
    }
  };

  
  return { getUserList, getAllTransactions, getUserTransactions, createTrader, updateTrader };
};
