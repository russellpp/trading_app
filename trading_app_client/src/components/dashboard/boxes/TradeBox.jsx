import React from "react";
import styled from "styled-components";
import TradeToggle from "../../buttons/TradeToggle";

function TradeBox() {
  return (
    <TradeBoxWrapper>
      <div>Make a trade</div>
      <RadioToggleContainer>
        <TradeToggle />
      </RadioToggleContainer>
      <div>
        <p>Coin</p>
        <p>Price: </p>
      </div>
    </TradeBoxWrapper>
  );
}

const TradeBoxWrapper = styled.div`
  grid-area: trade;
  display: flex;
  flex-direction: column;
  color: var(--navyDark);
  margin: 8px;
  margin-left: 12px;
  background-color: var(--icterineLight);
  border-radius: 20px;
  padding: 30px;
  font-family: "RobotoReg";
  > div:first-of-type {
    font-size: 40px;
    font-family: "Montserrat";
    font-weight: 600;
    letter-spacing: -0.8px;
  }
`;

const RadioToggleContainer = styled.div`
  margin-top: 20px;
  height: 100px;
  padding: 0px auto;
`;

export default TradeBox;
