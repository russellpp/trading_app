import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RAILS_API } from "../components/utils/Constants";
import {
  setLoading,
  clearLoading,
  setError,
  clearError,
  setSuccess,
  clearSuccess,
} from "../redux/requestStatusReducer";

export const useAuth = () => {
  const dispatch = useDispatch();

  const register = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(`${RAILS_API}/register`, {
      method: "POST",
      body: JSON.stringify(details),
      headers,
    });

    try {
      const response = await fetch(request);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      dispatch(setSuccess());
      dispatch(clearLoading());
      console.log(data);
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(clearLoading());
    }
  };

  const clearStates = () => {
    dispatch(clearAll());
  };

  return { register, clearStates };
};
