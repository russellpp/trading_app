import React from "react";
import styled from "styled-components";
import CoinSearch from "../boxes/CoinSearch";

function Coins() {
  return (
    <TradeContainer>
      <Header>
        <CoinSearch />
      </Header>
      <Body>body</Body>
      <TradeBox>trade</TradeBox>
    </TradeContainer>
  );
}

const TradeContainer = styled.div`
  display: grid;
  height: 100%;
  grid-template-areas:
    "search search"
    "coin trade";
  grid-template-columns: 70% 30%;
  grid-template-rows: 15% 85%;
`;

const Header = styled.div`
  grid-area: search;
  margin: 10px;
  background-color: var(--navyLight);
  border-radius: 30px;
  padding: 20px;
`;

const Body = styled.div`
  grid-area: coin;
  margin: 10px;
  background-color: var(--navy);
  border-radius: 30px;
  padding: 20px;
`;

const TradeBox = styled.div`
  grid-area: trade;
  margin: 10px;
  background-color: var(--navy);
  border-radius: 30px;
  padding: 20px;
`;

export default Coins;
