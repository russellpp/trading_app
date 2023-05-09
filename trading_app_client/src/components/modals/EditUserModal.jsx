import React, { useEffect, useState } from "react";
import { CancelButton, ModalFooter } from "./Modals";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  clearAddFunds,
  clearAddUser,
  clearEditUser,
} from "../../redux/modalReducer";
import { useAdmin } from "../../hooks/useAdmin";
import { current } from "@reduxjs/toolkit";
import {
  selectCurrentTrader,
  setCurrentTrader,
} from "../../redux/adminReducer";

function EditUserModal() {
  const dispatch = useDispatch();
  const { getUserList } = useAdmin();
  const { updateTrader } = useAdmin();
  const currentTrader = useSelector(selectCurrentTrader);
  const [filter, setFilter] = useState({
    approved: currentTrader?.approved,
    verified: currentTrader?.verified,
  });

  const [details, setDetails] = useState({
    email: currentTrader?.email,
    phone_number: currentTrader?.phone_number.substring(3),
    phone_number_with_local: "",
    balance: currentTrader?.balance,
    approved: currentTrader?.approved,
    verified: currentTrader?.verified,
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    if (details.phone_number) {
      setDetails((prevState) => ({
        ...prevState,
        phone_number_with_local: "+63".concat(details.phone_number),
      }));
    }
  }, [details.phone_number]);

  const handleClick = (option) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [option]: !prevFilter[option],
    }));
  };

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(clearEditUser());
    getUserList();
    dispatch(setCurrentTrader(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      trader: {
        email: details.email,
        phone_number: details.phone_number_with_local,
        balance: details.balance,
        verified: details.verified,
        approved: details.approved,
        password: details.password,
        password_confirmation: details.password_confirmation,
      },
    };
    console.log(requestBody);
    updateTrader(requestBody);
  };

  useEffect(() => {
    setDetails((prevState) => ({
      ...prevState,
      approved: filter.approved,
      verified: filter.verified,
    }));
  }, [filter]);

  return (
    <ModalContainer>
      <ModalHeader>Edit User</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <InputContainer>
            <Input
              id="email"
              type="text"
              placeholder=" "
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
            />
            <Placeholder htmlFor="email">EMAIL</Placeholder>
          </InputContainer>
          <InputContainer>
            <Input
              id="password"
              type="password"
              placeholder=" "
              value={details.password}
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
            />
            <Placeholder htmlFor="password">PASSWORD</Placeholder>
          </InputContainer>
          <InputContainer>
            <Input
              id="password_confirmation"
              type="password"
              placeholder=" "
              value={details.password_confirmation}
              onChange={(e) =>
                setDetails({
                  ...details,
                  password_confirmation: e.target.value,
                })
              }
            />
            <Placeholder htmlFor="password_confirmation">
              RETYPE PASSWORD
            </Placeholder>
          </InputContainer>
          <InputContainer>
            <InputNumber
              id="phone_number"
              inputmode="numeric"
              maxLength="10"
              placeholder=" "
              value={details.phone_number}
              onChange={(e) =>
                setDetails({ ...details, phone_number: e.target.value })
              }
              onKeyPress={(e) => {
                const keyCode = e.keyCode || e.which;
                const keyValue = String.fromCharCode(keyCode);
                if (/[^0-9]/.test(keyValue)) {
                  e.preventDefault();
                }
              }}
            />
            <Placeholder htmlFor="phone_number">PHONE NUMBER</Placeholder>
            <PlaceholderLocal>+63</PlaceholderLocal>
          </InputContainer>
          <InputContainer>
            <InputNumber
              id="balance"
              type="number"
              maxLength="10"
              placeholder=" "
              value={details.balance}
              onChange={(e) =>
                setDetails({ ...details, balance: e.target.value })
              }
              step="any"
              inputMode="decimal"
            />

            <Placeholder htmlFor="balance">BALANCE</Placeholder>
            <PlaceholderLocal>USD</PlaceholderLocal>
          </InputContainer>
          <div>
            <FilterOption
              active={filter.approved}
              onClick={() => handleClick("approved")}
            >
              <span>approved</span>
            </FilterOption>
            <FilterOption
              active={filter.verified}
              onClick={() => handleClick("verified")}
            >
              <span>verified</span>
            </FilterOption>
          </div>
        </ModalBody>
        <ModalFooter>
          <FormSubmitButton type="submit" value="edit user" />
          <FormSubmitButton type="button" value="close" onClick={handleClose} />
        </ModalFooter>
      </Form>
    </ModalContainer>
  );
}

export default EditUserModal;

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
  > div:last-of-type {
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
