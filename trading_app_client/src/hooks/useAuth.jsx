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
  selectError,
} from "../redux/requestStatusReducer";
import {
  clearResendDetails,
  selectLoginDetails,
  setLoginDetails,
  setResendDetails,
  userLogin,
} from "../redux/userReducer";
import {
  goToPasswordResetCodePage,
  goToResendVerifyPage,
  goToVerifyPage,
  selectCurrentPage,
} from "../redux/navigationReducer";
import { useNavigate } from "react-router";
import { useState } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectError);
  const navigate = useNavigate();
  const currentLoginDetails = useSelector(selectLoginDetails);
  const currentPage = useSelector(selectCurrentPage);

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

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      dispatch(setSuccess(data.messages));
      dispatch(clearLoading());
    } else {
      const data = await response.json();
      dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const login = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());
    dispatch(setLoginDetails(details));

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(`${RAILS_API}/login`, {
      method: "POST",
      body: JSON.stringify(details),
      headers,
    });

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      dispatch(userLogin(data));
      dispatch(clearLoading());
    } else {
      const data = await response.json();
      dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(data);
      if (data.redirect_to_verify) {
        console.log(details.user.email);
        dispatch(goToVerifyPage());
        navigate("/home/verify/input_code");
      }
    }
  };

  const verify = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(`${RAILS_API}/verify`, {
      method: "POST",
      body: JSON.stringify(details),
      headers,
    });

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      dispatch(setSuccess(data.status));
      dispatch(clearLoading());
      navigate("/home/login");
    } else {
      const data = await response.json();
      dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const send_code = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());
    dispatch(setResendDetails(details));
    console.log(currentPage);

    const send_class =
      currentPage === "verify_resend" ? "verification" : "reset";

    const requestDetails = {
      send: {
        send_type: send_class,
        phone_number: details.phone_number_with_local,
      },
    };

    console.log(requestDetails);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(`${RAILS_API}/send_code`, {
      method: "POST",
      body: JSON.stringify(requestDetails),
      headers,
    });

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      dispatch(clearLoading());
      if (currentPage === "verify_resend") {
        dispatch(goToVerifyPage());
        navigate("/home/verify/input_code");
      } else {
        dispatch(goToPasswordResetCodePage());
        navigate("/home/reset/input_code");
      }
      dispatch(setSuccess(data.messages));
    } else {
      const data = await response.json();
      dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const reset = async (details) => {
    dispatch(setLoading());
    dispatch(clearError());
    dispatch(clearSuccess());

    const requestDetails = {
      reset_confirm: {
        phone_number: details.phone_number,
        code: Number(details.reset_code),
        password: details.password,
        password_confirmation: details.password_confirmation,
      },
    };

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const request = new Request(`${RAILS_API}/confirm_reset`, {
      method: "POST",
      body: JSON.stringify(requestDetails),
      headers,
    });

    const response = await fetch(request);
    if (response.status <= 300) {
      const data = await response.json();
      console.log(data);
      dispatch(clearLoading());
      dispatch(setSuccess(data.status));
      dispatch(clearResendDetails());
    } else {
      const data = await response.json();
      dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(data);
    }
  };

  const clearStates = () => {
    dispatch(clearAll());
  };

  return { register, login, verify, send_code, reset, clearStates };
};
