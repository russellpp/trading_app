import Cookies from "js-cookie";
import React from "react";
import { Route, Routes } from "react-router";
import Profile from "./trader/Profile";
import Trade from "./trader/Trade";
import Coins from "./trader/Coins";
import styled from "styled-components";

function DashBody() {
  const handleClick = () => {
    const cookie = Cookies.get("user");
    console.log(cookie);
  };
  return (
    <>
      <DashBodyWrapper>
        <Routes>
          <Route path="/" element={<Trade />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/coins" element={<Coins />} />
        </Routes>
      </DashBodyWrapper>
    </>
  );
}

const DashBodyWrapper = styled.div`
  box-sizing: content-box;
  height: 100%;
  background-color: var(--navyDark);
  flex: 1;
`;

export default DashBody;
