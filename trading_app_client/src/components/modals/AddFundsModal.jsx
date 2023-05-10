import React, { useEffect, useState } from "react";
import { CancelButton, ModalFooter } from "./Modals";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  clearAddFunds,
  clearAddUser,
  clearEditUser,
  setAddFunds,
} from "../../redux/modalReducer";
import { useAdmin } from "../../hooks/useAdmin";
import { current } from "@reduxjs/toolkit";
import {
  selectCurrentTrader,
  setCurrentTrader,
} from "../../redux/adminReducer";
import { useTrader } from "../../hooks/useTrader";

function AddFundsModal() {
  const dispatch = useDispatch();
  const { addFunds } = useTrader();
  const [details, setDetails] = useState({
    amount: "",
    withdraw: false,
    deposit: true,
  });
  const [filter, setFilter] = useState({
    withdraw: false,
    deposit: true,
  });

  const handleClick = (option) => {
    if (option === "deposit") {
      setFilter({
        deposit: true,
        withdraw: false,
      });
    } else {
      setFilter({
        deposit: false,
        withdraw: true,
      });
    }
  };
  useEffect(() => {
    setDetails((prevState) => ({
      ...prevState,
      withdraw: filter.withdraw,
      deposit: filter.deposit,
    }));
  }, [filter]);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(clearAddFunds());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {
      funds_transfer: {
        transaction_type: details?.withdraw ? "withdraw" : "deposit",
        amount: details.amount,
      },
    };
    console.log(requestBody);
    addFunds(requestBody);
  };

  return (
    <ModalContainer>
      <ModalHeader>Funds Transfer</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <div>
            <FilterOption
              active={filter.deposit}
              onClick={() => handleClick("deposit")}
            >
              <span>deposit</span>
            </FilterOption>
            <FilterOption
              active={filter.withdraw}
              onClick={() => handleClick("withdraw")}
            >
              <span>withdraw</span>
            </FilterOption>
          </div>
          <InputContainer>
            <InputNumber
              id="amount"
              type="number"
              maxLength="10"
              placeholder=" "
              value={details.amount}
              onChange={(e) =>
                setDetails({ ...details, amount: e.target.value })
              }
              step="any"
              inputMode="decimal"
            />

            <Placeholder htmlFor="amount">AMOUNT</Placeholder>
            <PlaceholderLocal>USD</PlaceholderLocal>
          </InputContainer>
        </ModalBody>
        <ModalFooter>
          <FormSubmitButton type="submit" value="transfer" />
          <FormSubmitButton type="button" value="close" onClick={handleClose} />
        </ModalFooter>
      </Form>
    </ModalContainer>
  );
}

export default AddFundsModal;

const FilterOption = styled.div`
  width: 100px;
  padding: 5px 10px;

  background-color: ${({ active }) =>
    active ? "var(--blushDark)" : "var(--navyDark)"};
  color: ${({ active }) => (active ? "var(--icterine)" : "var(--navyLighter)")};
  font-family: "RobotoMed";
  text-align: center;
  margin-right: 20px;
  margin-top: 15px;
  margin-bottom: 40px;
  text-transform: uppercase;
  font-size: 16px;
  height: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: var(--navy);
    color: var(--icterine);
  }
`;

const FormContainer = styled(motion.div)`
  font-family: "RobotoReg";
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PlaceholderLocal = styled.p`
  font-size: 16px;
  font-family: "Montserrat";
  color: var(--blushLight);
  position: absolute;
  padding: 5px 10px;
  font-weight: 600;

  top: 28px;
  left: 14px;
  border-radius: 10px;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
  transform-origin: top left;
  opacity: 0;
  transition: 0.3s;
`;

const InputContainer = styled.div`
  position: relative;
  height: 40px;
  padding-top: 20px;
  margin-bottom: 10px;
  width: 100%;

  &:focus-within > ${PlaceholderLocal} {
    opacity: 1;
  }
`;

const Input = styled.input`
  background-color: var(--navyLight);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--blushLighter);
  font-family: "Montserrat";
  font-size: 14px;
  font-weight: 600;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 300px;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-20px) scale(0.75);
    color: var(--blushLighter);
    background-color: var(--blushDarker);
    padding: 5px 10px;
  }
`;

const InputNumber = styled.input`
  background-color: var(--navyLight);
  border-radius: 12px;
  border: 0;
  font-weight: 600;

  box-sizing: border-box;
  color: var(--blushLighter);
  font-family: "Montserrat";
  font-size: 14px;
  height: 100%;
  outline: 0;
  padding: 5px 65px 0;
  width: 300px;
  letter-spacing: 2px;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-20px) scale(0.75);
    color: var(--blushLighter);
    background-color: var(--blushDarker);
    padding: 5px 10px;
  }

  &:not(:placeholder-shown) {
    ~ ${PlaceholderLocal} {
      opacity: 1;
    }
  }
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Placeholder = styled.label`
  font-size: 20px;
  font-family: "Montserrat";
  font-weight: 600;
  color: var(--blushLight);
  position: absolute;
  padding: 5px 10px;
  top: 23px;
  left: 14px;
  border-radius: 10px;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
  transform-origin: top left;
`;

const FormSubmitButton = styled.input`
  height: 35px;
  width: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 10px;
  padding: 8px 25px;
  border-radius: 25px;
  border: none;
  background-color: var(--navy);
  color: white;
  font-size: 15px;
  font-family: "Montserrat";
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--navy);
    scale: 1.1;
    font-weight: 600;
  }
`;

const ModalBody = styled.div`
  box-sizing: border-box;
  padding: 15px 30px;
  width: 100%;
  height: auto;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  font-family: "RobotoReg";
  color: var(--magenta);
  font-size: 15px;
  letter-spacing: 0px;
  > div:first-of-type {
    display: flex;
    flex-direction: row;
  }
`;
const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border-radius: 20px;
  font-family: "Montserrat";
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  min-height: 200px;
  height: auto;
  width: auto;
  background-color: var(--navyLighter);
  box-shadow: 0 0 0 20000px #00000076;
  transition: opacity 0.15s ease-in-out;
  opacity: 1;
  z-index: 4;
`;

const ModalHeader = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px;
  font-weight: bold;
  background-color: var(--navyDark);
  color: white;
`;
