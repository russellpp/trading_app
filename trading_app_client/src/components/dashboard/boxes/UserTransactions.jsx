import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  selectUserCryptos,
  selectUserTransactions,
} from "../../../redux/userReducer";
import {
  formatDate,
  roundToSixSignificantFigures,
} from "../../utils/UtilityFunctions";
import { selectCurrentCoin } from "../../../redux/coinReducer";
import {
  selectCurrentTrader,
  selectTraderTransactions,
} from "../../../redux/adminReducer";

function UserTransactions() {
  const [array, setArray] = useState([]);
  const transactions = useSelector(selectTraderTransactions);
  const currentTrader = useSelector(selectCurrentTrader);

  useEffect(() => {
    if (transactions) {
      const arr = transactions?.transactions;
      setArray(arr?.slice().reverse());
    }
  }, [transactions]);

  return (
    <TransactionContainer>
      <h2>Transactions</h2>
      <Wrapper>
        <ul>
          {array?.map((transaction, index) => (
            <ListItem key={index}>
              <p>{transaction.transaction_type}</p>
              <p>
                {roundToSixSignificantFigures(transaction.quantity)}{" "}
                {transaction.ticker}
              </p>
              <p>
                $ {roundToSixSignificantFigures(transaction.total_value)} {}
              </p>
              <p>{formatDate(transaction.created_at)}</p>
              <p>{transaction.name}</p>
            </ListItem>
          ))}
        </ul>
      </Wrapper>
    </TransactionContainer>
  );
}
const TransactionContainer = styled.div`
  padding: 10px;
  border-radius: 15px;
  height: 600px;
  border: 2px solid var(--blush);
`;
const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  overflow-y: auto;
  > ul {
    padding: 10px;
    overflow-y: auto;
    list-style: none;
    height: 100%;
    padding: 10px;
    text-transform: uppercase;
  }
`;
const ListItem = styled.li`
  height: 45px;
  box-sizing: content-box;
  display: grid;
  background-color: var(--blushLighter);
  padding: 5px 5px;
  grid-template-areas: "buy qty value" "time coin value";
  grid-template-columns: 0.8fr 1.2fr 1fr;
  grid-template-rows: 30px 15px;
  margin-top: 10px;

  > p:nth-of-type(2),
  p:nth-of-type(3),
  p:first-of-type {
    color: var(--navy);
    font-size: 22px;
  }

  > p:first-of-type {
  }

  > p:nth-of-type(3) {
    grid-area: value;
    font-size: 33px;
    color: var(--navy);
  }

  > p:nth-of-type(4),
  p:nth-of-type(5),
  p:nth-of-type(6) {
    font-size: 12px;
    color: var(--navy);
  }

  &:hover {
    background-color: var(--blushLight);
    cursor: pointer;
  }
`;

export default UserTransactions;
