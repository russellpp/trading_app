import React, { useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginDetails } from "../../../redux/userReducer";
import { useAuth } from "../../../hooks/useAuth";
import { goToResendVerifyPage } from "../../../redux/navigationReducer";

function VerifyInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentLoginDetails = useSelector(selectLoginDetails);
  const { verify } = useAuth();
  const [details, setDetails] = useState({
    phone_number: "",
    reset_code: null,
  });

  const handleResend = () => {
    dispatch(goToResendVerifyPage());
    navigate("/home/verify");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(currentLoginDetails);
    const requestDetails = {
      verify: {
        email: currentLoginDetails.user.email,
        verification_code: details.reset_code,
      },
    };
    verify(requestDetails);
  };

  return (
    <VerifyInputWrapper
      initial={{ opacity: 0, translateY: 100 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <Title>Enter verification code</Title>
          <InputContainer variant="code">
            <InputCode
              variant="code"
              id="reset_code"
              inputmode="numeric"
              maxLength="6"
              placeholder=" "
              value={details.reset_code}
              onChange={(e) =>
                setDetails({ ...details, reset_code: e.target.value })
              }
              onKeyPress={(e) => {
                const key = e.key;
                if (isNaN(key) || key === " ") {
                  e.preventDefault();
                }
              }}
            />
            <PlaceholderNumber htmlFor="code" variant="code">
              6-DIGIT CODE
            </PlaceholderNumber>
          </InputContainer>
          <FormSubmitButton type="submit" value="Submit" />
          <NavLink>
            Did not receive a code?
            <span onClick={handleResend}> Resend code.</span>
          </NavLink>
        </Form>
      </FormContainer>
    </VerifyInputWrapper>
  );
}

const VerifyInputWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  padding-top: 5px;
`;
const FormContainer = styled(motion.div)`
  font-family: "RobotoReg";
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--magentaDark);
  margin-left: 10px;
  margin-bottom: 25px;
  letter-spacing: -1px;
  padding-bottom: 10px;
`;

const InputContainer = styled.div`
  position: relative;
  height: ${({ variant }) => (variant === "code" ? "80px" : "50px")};
  padding-top: 20px;
  margin-bottom: 10px;
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
    background-color: var(--magentaDarker);
    padding: 5px 10px;
  }
`;

const InputCode = styled.input`
  background-color: var(--magentaDark);
  border-radius: 40px;
  border: 0;
  box-sizing: border-box;
  color: var(--white);
  font-family: "Montserrat";
  font-size: 30px;
  height: 100%;
  outline: 0;
  width: 400px;
  letter-spacing: 20px;
  text-align: center;

  &:focus + label,
  &:not(:placeholder-shown) + label {
    transform: translateY(-35px) translateX(0px) scale(0.75);
    color: var(--blush);
    background-color: var(--magentaDarker);
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

const PlaceholderNumber = styled.label`
  font-size: 30px;
  font-family: "Montserrat";
  color: var(--magentaLight);
  position: absolute;
  padding: 5px 20px;
  top: 35px;
  left: 75px;
  border-radius: 10px;
  transition: transform 0.2s, color 0.2s;
  pointer-events: none;
  transform-origin: top;
`;

const FormSubmitButton = styled.input`
  height: 50px;
  width: 200px;
  margin-top: 20px;
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
  bottom: 30px;
  font-family: "RobotoReg";
  color: var(--navyLight);
  & > span {
    cursor: pointer;
    &:hover {
      color: var(--magenta);
      font-family: "RobotoMed";
    }
  }
`;

export default VerifyInput;
