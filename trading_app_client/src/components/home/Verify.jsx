import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { selectCurrentPage } from "../../redux/navigationReducer";
import PhoneInput from "./input/PhoneInput";
import { Routes, Route } from "react-router";
import VerifyInput from "./input/VerifyInput";

function Verify() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<PhoneInput />} />
        <Route path="/input_code" element={<VerifyInput />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Verify;
