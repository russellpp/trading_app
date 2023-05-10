import Cookies from "js-cookie";
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
  clearAll,
} from "../redux/requestStatusReducer";
import {
  clearResendDetails,
  selectLoginDetails,
  selectUser,
  setLoginDetails,
  setResendDetails,
  userLogin,
  userLogout,
} from "../redux/userReducer";
import {
  goToDashboard,
  goToHomePage,
  goToLoginPage,
  goToPasswordResetCodePage,
  goToResendVerifyPage,
  goToVerifyPage,
  selectCurrentPage,
} from "../redux/navigationReducer";
import { useNavigate } from "react-router";
import { useState } from "react";
import { clearCoins } from "../redux/coinReducer";
import { clearAdmin } from "../redux/adminReducer";

export const useAuth = () => {
  const dispatch = useDispatch();
  const errors = useSelector(selectError);
  const navigate = useNavigate();
  const currentLoginDetails = useSelector(selectLoginDetails);
  const currentPage = useSelector(selectCurrentPage);
  const adminUser = useSelector(selectUser)

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
      dispatch(goToLoginPage());
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
    headers.append("Authorization", `Bearer ${adminUser.token}`)

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
      dispatch(goToDashboard());
      const expirationTime = new Date(Date.now() + 29 * 60 * 1000 + 56 * 1000);
      Cookies.set("user", JSON.stringify(data), {
        path: "/",
        expires: expirationTime,
      });
    } else {
      const data = await response.json();
      dispatch(setError(data.errors));
      dispatch(clearLoading());
      console.log(data);
      if (data.redirect_to_verify) {
        console.log(details.user.email);
        dispatch(goToVerifyPage());
      }
    }
  };

  const logout = () => {
    dispatch(setLoading());

    dispatch(userLogout());
    dispatch(clearCoins());
    dispatch(clearAdmin())

    localStorage.clear();
    Cookies.remove("user");
    dispatch(goToHomePage());
    dispatch(clearLoading());
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
      dispatch(goToLoginPage());
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
      } else {
        dispatch(goToPasswordResetCodePage());
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
      dispatch(goToLoginPage());
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

  return { register, login, logout, verify, send_code, reset, clearStates };
};
