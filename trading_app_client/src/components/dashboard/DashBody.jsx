import Cookies from "js-cookie";
import React from "react";
import { Route, Routes } from "react-router";
import Profile from "./trader/Profile";
import Trade from "./trader/Trade";
import Coins from "./trader/Coins";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/userReducer";
import Users from "./admin/Users";
import Transactions from "./admin/Transactions";

function DashBody() {
  const user = useSelector(selectUser);
  const handleClick = () => {
    const cookie = Cookies.get("user");
    console.log(cookie);
  };
  return (
    <>
      <DashBodyWrapper>
        {!user.isAdmin && (
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/trade" element={<Trade />} />7
          </Routes>
        )}
        {user.isAdmin && <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/transactions" element={<Transactions />}/>
          </Routes>}
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
