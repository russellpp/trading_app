import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { selectCurrentPage } from "../../redux/navigationReducer";
import PhoneInput from "./input/PhoneInput";
import NewPasswordInput from "./input/NewPasswordInput";
import { Routes, Route } from "react-router";

function Reset() {
  const currentPage = useSelector(selectCurrentPage);

  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<PhoneInput />} />
        <Route path="/input_code" element={<NewPasswordInput />} />
      </Routes>
    </AnimatePresence>
  );
}



export default Reset;
