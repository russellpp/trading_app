import React from "react";
import Sidebar from "./dashboard/Sidebar";
import DashBody from "./dashboard/DashBody";

import styled from "styled-components";

function DashBoard() {
  return (
    <PageWrapper>
      <Sidebar />
      <DashBody/>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export default DashBoard;
