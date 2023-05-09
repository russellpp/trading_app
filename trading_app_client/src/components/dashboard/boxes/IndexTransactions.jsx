import React, { useEffect, useSyncExternalStore } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredTransactions,
  selectTransactionsList,
  setFilteredTransactions,
} from "../../../redux/adminReducer";
import {
  formatDate,
  roundToSixSignificantFigures,
} from "../../utils/UtilityFunctions";

function IndexTransactions() {
  const dispatch = useDispatch();
  const transactionList = useSelector(selectTransactionsList);
  const filteredList = useSelector(selectFilteredTransactions);

  useEffect(() => {
    if (transactionList) {
      dispatch(setFilteredTransactions(transactionList));
    }
  }, [transactionList]);

  return (
    <TransactionContainer>
      <Wrapper>
        <ul>
          {filteredList?.map((transaction, index) => (
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
              <p>{transaction.email}</p>
              <p>USER ID: {transaction.user_id}</p>
            </ListItem>
          ))}
        </ul>
      </Wrapper>
    </TransactionContainer>
  );
}

const TransactionContainer = styled.div``;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  max-height: 1000px;
  flex-direction: column;
  > ul {
    overflow-y: auto;
    list-style: none;
    height: 100%;
    padding: 5px;
    text-transform: uppercase;
  }
`;
const ListItem = styled.li`
  height: 45px;
  box-sizing: content-box;
  display: grid;
  background-color: var(--navyLight);
  padding: 5px 5px;
  grid-template-areas:
    "buy user qty value"
    "time userid coin value";
  grid-template-columns: 0.8fr 1fr 1.2fr 1fr;
  grid-template-rows: 30px 15px;
  margin-top: 5px;
  margin-bottom: 5px;

  > p:nth-of-type(2),
  p:nth-of-type(3),
  p:first-of-type {
    color: var(--blushLightest);
    font-size: 22px;
  }

  > p:nth-of-type(4),
  p:nth-of-type(5),
  p:nth-of-type(7),
  p:nth-of-type(6) {
    font-size: 12px;
    color: var(--blushLightest);
  }

  > p:first-of-type {
    grid-area: buy;
  }
  > p:nth-of-type(2) {
    grid-area: qty;
    color: var(--blushLightest);
  }

  > p:nth-of-type(3) {
    grid-area: value;
    font-size: 33px;
    color: var(--blushLightest);
  }

  > p:nth-of-type(4) {
    grid-area: time;
  }

  > p:nth-of-type(5) {
    grid-area: coin;
  }

  > p:nth-of-type(6) {
    font-size: 18px;
    grid-area: user;
  }

  > p:nth-of-type(7) {
    grid-area: userid;
  }

  &:hover {
    background-color: var(--navyDarker);
  }
`;

export default IndexTransactions;
