import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  goToRegisterPage,
  goToPasswordResetPage,
  goToVerifyPage,
} from "../../redux/navigationReducer";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleGoToRegister = () => {
    dispatch(goToRegisterPage());
    navigate("/home/register");
  };
  const handleGoToReset = () => {
    dispatch(goToPasswordResetPage());
    navigate("/home/reset");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestDetails = {
      user: details,
    };
    login(requestDetails);
  };

  return (
    <AnimatePresence>
      <LoginWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <TitleContainer
          initial={{ y: 100, opacity: 0.3 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Logo />
          <LogoName>COIN·SWIFT</LogoName>
        </TitleContainer>
        <FormContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Form onSubmit={handleSubmit}>
            <Title>Sign in to your account</Title>
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
              <Placeholder htmlFor="email">PASSWORD</Placeholder>
            </InputContainer>
            <FormSubmitButton type="submit" value="Continue" />
            <NavLink>
              <p onClick={handleGoToReset}>Forgot password?</p>
              Don't have an account?
              <span onClick={handleGoToRegister}> Sign up now!</span>
            </NavLink>
          </Form>
        </FormContainer>
      </LoginWrapper>
    </AnimatePresence>
  );
}

const LoginWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 40% 60%;
`;

const TitleContainer = styled(motion.div)`
  margin-left: 70px;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 2rem;
`;

const Logo = styled.div`
  z-index: 2;
  width: 20rem;
  height: 20rem;
  background-image: url("/src/assets/icon-crop-navy.svg");
  background-size: cover;
  margin-top: 30px;
  margin-bottom: 10px;
  transform: scaleX(-1);
`;
const LogoName = styled.div`
  margin-top: 15px;
  font-family: "SanGiuseppe";
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 3px;
  margin-left: 28px;
  color: var(--navy);
`;
const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--navy);
  margin-left: 10px;
  margin-bottom: 15px;
  letter-spacing: -1px;
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

const InputContainer = styled.div`
  position: relative;
  height: 50px;
  padding-top: 20px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  background-color: var(--navy);
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
    color: var(--blushLight);
    background-color: var(--navyDark);
    padding: 5px 10px;
  }
`;

const Placeholder = styled.label`
  font-size: 20px;
  font-family: "Montserrat";
  color: var(--navyLighter);
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
  margin-top: 20px;
  margin-bottom: 16px;
  padding: 8px;
  border-radius: 25px;
  border: none;
  background-color: var(--navyLight);
  color: white;
  font-size: 18px;
  font-family: "Montserrat";
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--blush);
    scale: 1.1;
    font-size: 20px;
  }
`;

const NavLink = styled.div`
  position: absolute;
  bottom: 70px;
  font-family: "RobotoReg";
  color: var(--navyLight);
  font-size: 17px;

  & > span {
    cursor: pointer;
    &:hover {
      color: var(--magenta);
      font-family: "RobotoMed";
    }
  }

  & > p {
    font-size: 15px;
    text-align: center;
    margin-bottom: 20px;
    cursor: pointer;
    &:hover {
      color: var(--magenta);
      font-family: "RobotoMed";
    }
  }
`;

export default Login;
