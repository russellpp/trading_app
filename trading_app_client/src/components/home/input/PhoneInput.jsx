import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  goToPasswordResetCodePage,
  selectCurrentPage,
} from "../../../redux/navigationReducer";

function PhoneInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    phone_number: "",
  });

  const currentPage = useSelector(selectCurrentPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(goToPasswordResetCodePage);
    navigate("input_code");
  };

  return (
    <ResetWrapper
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FormContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Form onSubmit={handleSubmit}>
          <Title>
            {currentPage === "reset" ? "Reset password" : "Verify account"}
          </Title>

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
                const key = e.key;
                if (isNaN(key) || key === " ") {
                  e.preventDefault();
                }
              }}
            />
            <Placeholder htmlFor="phone_number">PHONE NUMBER</Placeholder>
            <PlaceholderLocal>+63</PlaceholderLocal>
          </InputContainer>
          <FormSubmitButton type="submit" value="Send code" />
        </Form>
      </FormContainer>
    </ResetWrapper>
  );
}

const ResetWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  margin-top: 80px;
`;

const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--magentaDark);
  margin-left: 10px;
  margin-bottom: 5px;
  letter-spacing: 0px;
  padding-bottom: 10px;
  text-transform: uppercase;
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
  font-size: 20px;
  font-family: "Montserrat";
  color: var(--magentaLight);
  position: absolute;
  padding: 7px 10px 5px;
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
  height: 50px;
  padding-top: 20px;
  margin-bottom: 5px;

  &:focus-within > ${PlaceholderLocal} {
    opacity: 1;
  }
`;

const Input = styled.input`
  background-color: var(--magentaDark);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white);
  font-family: "Montserrat";
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 400px;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-23px) scale(0.75);
    color: var(--navyLighter);
    background-color: var(--buffDarker);
    padding: 5px 10px;
  }
`;

const InputNumber = styled.input`
  background-color: var(--magentaDark);
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: var(--white);
  font-family: "Montserrat";
  font-size: 19px;
  height: 100%;
  outline: 0;
  padding: 5px 70px 0;
  width: 400px;
  letter-spacing: 2px;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-23px) scale(0.75);
    color: var(--blush);
    background-color: var(--magentaDarker);
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
  color: var(--magentaLight);
  position: absolute;
  padding: 5px 10px;
  top: 28px;
  left: 14px;
  border-radius: 10px;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
  transform-origin: top left;
`;

const FormSubmitButton = styled.input`
  height: 50px;
  width: 200px;
  margin-top: 30px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 25px;
  border: none;
  background-color: var(--magentaLight);
  color: white;
  font-size: 18px;
  font-family: "Montserrat";
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--blushDark);
    scale: 1.1;
    font-size: 20px;
  }
`;

const NavLink = styled.div`
  position: absolute;
  bottom: 70px;
  font-family: "RobotoReg";
  color: var(--navyLight);

  & > span {
    cursor: pointer;
    &:hover {
      color: var(--magenta);
    }
  }
`;

export default PhoneInput;
