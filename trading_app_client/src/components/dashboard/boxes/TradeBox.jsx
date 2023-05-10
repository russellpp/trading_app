import React, { useEffect } from "react";
import styled from "styled-components";
import TradeToggle from "../../buttons/TradeToggle";
import { useState } from "react";
import {
  formatPrice,
  roundToSixSignificantFigures,
} from "../../utils/UtilityFunctions";
import { useSelector } from "react-redux";
import {
  selectCurrentCoin,
  selectExactPrice,
} from "../../../redux/coinReducer";
import { selectTradeTransactionType } from "../../../redux/tradeReducer";
import { useTrader } from "../../../hooks/useTrader";
import {
  selectUserCryptos,
  selectUserWallet,
} from "../../../redux/userReducer";
import { selectSuccess } from "../../../redux/requestStatusReducer";

function TradeBox() {
  const [details, setDetails] = useState({
    amount: "",
    price: null,
    value: "",
    currently_owned: "",
  });
  const walletBalance = useSelector(selectUserWallet);
  const currentCoin = useSelector(selectCurrentCoin);
  const currentPrice = useSelector(selectExactPrice);
  const transactionType = useSelector(selectTradeTransactionType);
  const ownedCoins = useSelector(selectUserCryptos);
  const status = useSelector(selectSuccess);
  const { trade } = useTrader();

  const handleValueChange = (e) => {
    const value = parseFloat(e.target.value);
    const amount = roundToSixSignificantFigures(value / currentPrice); // Use currentPrice instead of details.price
    setDetails({
      ...details,
      value: roundToSixSignificantFigures(value),
      amount: amount.toString(),
    });
  };

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    const value = roundToSixSignificantFigures(amount * currentPrice);
    setDetails({
      ...details,
      amount: roundToSixSignificantFigures(amount).toString(),
      value: roundToSixSignificantFigures(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionDetails = {
      transaction: {
        transaction_type: transactionType,
        quantity: parseFloat(details.amount),
        gecko_id: currentCoin?.gecko_id,
        total_value: parseFloat(details.value),
      },
    };
    console.log(transactionDetails);
    trade(transactionDetails);
  };

  useEffect(() => {
    if (currentCoin) {
      const userCryptoId = ownedCoins?.cryptos.findIndex(
        (coin) => coin.gecko_id === currentCoin?.gecko_id
      );
      if (userCryptoId >= 0) {
        setDetails((prevState) => ({
          ...prevState,
          currently_owned: ownedCoins.cryptos[userCryptoId].quantity,
        }));
      } else {
        setDetails((prevState) => ({
          ...prevState,
          currently_owned: 0,
        }));
      }
    }
  }, [currentCoin, status]);

  if (!currentCoin) {
    return null;
  }

  return (
    <TradeBoxWrapper>
      <TradeForm onSubmit={handleSubmit}>
        <div>Make a trade</div>
        <RadioToggleContainer>
          <TradeToggle />
        </RadioToggleContainer>
        <div>
          <p>{currentCoin?.name}</p>
          <p>{currentPrice && formatPrice(currentPrice)}</p>
        </div>
        <InputContainer>
          <InputNumber
            id="value"
            type="number"
            maxLength="10"
            placeholder=" "
            value={details.value}
            onChange={handleValueChange}
            step="any"
            inputMode="decimal"
          />
          <Placeholder htmlFor="value">Total Value</Placeholder>
          <PlaceholderLocal>USD</PlaceholderLocal>
        </InputContainer>
        <InputContainer>
          <InputNumber
            id="amount"
            type="number"
            maxLength="10"
            placeholder=" "
            value={details.amount}
            onChange={handleAmountChange}
            step="any"
            inputMode="decimal"
          />
          <Placeholder htmlFor="amount">Quantity</Placeholder>
          <PlaceholderLocal>{currentCoin.ticker}</PlaceholderLocal>
        </InputContainer>
        <div>
          <p>{currentCoin.ticker} owned</p>
          <p>
            {details.currently_owned}
          </p>
          <p>Wallet balance</p>
          <p>{walletBalance ? formatPrice(walletBalance) : "$ 0"} USD</p>
        </div>
        <FormSubmitButton
          type="submit"
          value={`${transactionType} ${currentCoin.ticker}`}
        />
      </TradeForm>
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
`;

const RadioToggleContainer = styled.div`
  margin-top: 20px;
  height: 100px;
  padding: 0px auto;
`;

const TradeForm = styled.form`
  > div:first-of-type {
    font-size: 40px;
    font-family: "Montserrat";
    font-weight: 600;
    letter-spacing: -0.8px;
  }
  > div:nth-of-type(3) {
    text-align: center;
    P {
      &:first-child {
        font-size: 20px;
      }
      &:nth-child(2) {
        font-size: 35px;
      }
    }
  }
  > div:nth-of-type(6) {
    text-align: left;
    margin-top: 30px;
    P {
      &:first-child {
        font-size: 15px;
        text-transform: uppercase;
      }
      &:nth-child(2) {
        font-size: 25px;
      }
      &:nth-child(3) {
        margin-top: 10px;
        font-size: 15px;
        text-transform: uppercase;
      }
      &:nth-child(4) {
        font-size: 25px;
      }
    }
  }
`;

const PlaceholderLocal = styled.p`
  font-size: 20px;
  font-family: "Montserrat";
  color: var(--icterineDarker);
  position: absolute;
  padding: 5px 10px;
  top: 30px;
  left: 24px;
  border-radius: 10px;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
  transform-origin: top left;
  opacity: 0;
  transition: 0.3s;
`;
const InputContainer = styled.div`
  position: relative;
  height: 50px;
  padding-top: 20px;
  margin-bottom: 5px;

  &:focus-within > ${PlaceholderLocal} {
    opacity: 1;
  }
`;

const InputNumber = styled.input`
  margin-left: 15px;
  background-color: var(--icterineDark);
  border-radius: 20px;
  border: 0;
  box-sizing: border-box;
  color: var(--navy);
  font-family: "Montserrat";
  font-size: 19px;
  height: 100%;
  outline: 0;
  padding: 5px 100px 0;
  width: 350px;
  letter-spacing: 2px;
  -moz-appearance: textfield;
  appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-23px) scale(0.75);
    color: var(--icterineLighter);
    background-color: var(--icterineDarker);
    padding: 5px 10px;
  }

  &:not(:placeholder-shown) {
    ~ ${PlaceholderLocal} {
      opacity: 1;
    }
  }
`;

const Placeholder = styled.label`
  font-size: 20px;
  font-family: "Montserrat";
  color: var(--icterineDarker);
  position: absolute;
  padding: 5px 10px;
  top: 30px;
  left: 24px;
  border-radius: 10px;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
  transform-origin: top left;
`;

const FormSubmitButton = styled.input`
  height: 50px;
  width: 200px;
  margin-top: 50px;
  margin-bottom: 16px;
  margin-left: 100px;
  margin-right: auto;
  padding: 8px;
  border-radius: 25px;
  border: none;
  background-color: var(--navyDark);
  color: white;
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: 600;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--icterineDark);
    color: var(--navyDark);
    font-weight: 700;
    scale: 1.1;
    font-size: 20px;
  }
`;

export default TradeBox;
