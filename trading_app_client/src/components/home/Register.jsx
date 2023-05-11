import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { goToRegisterPage } from "../../redux/navigationReducer";
import { AnimatePresence, motion } from "framer-motion";
import { setRequestDetails, setRequestType } from "../../redux/requestReducer";
import { useAuth } from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register } = useAuth();
  const [details, setDetails] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    phone_number_with_local: "",
  });

  const handleGoToRegister = () => {
    dispatch(goToRegisterPage());
    navigate("/home/register");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
    const requestDetails = {
      user: {
        email: details.email,
        password: details.password,
        password_confirmation: details.password_confirmation,
        phone_number: details.phone_number_with_local,
      },
    };
    register(requestDetails);
  };

  useEffect(() => {
    if (details.phone_number) {
      setDetails((prevState) => ({
        ...prevState,
        phone_number_with_local: "+63".concat(details.phone_number),
      }));
    }
  }, [details.phone_number]);

  return (
    <AnimatePresence>
      <RegisterWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <FormContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Form onSubmit={handleSubmit}>
            <Title>Let's create your account</Title>
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
            <FormSubmitButton type="submit" value="Submit" />
          </Form>
        </FormContainer>
        <TitleContainer
          initial={{ y: 100, opacity: 0.3 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Logo />
          <LogoName>COIN·SWIFT</LogoName>
        </TitleContainer>
      </RegisterWrapper>
    </AnimatePresence>
  );
}

const RegisterWrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 60% 40%;
`;

const TitleContainer = styled(motion.div)`
  margin-right: 70px;
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
  background-image: url("/icon-crop-buff.svg");
  background-size: cover;
  margin-top: 30px;
  margin-bottom: 10px;
`;
const LogoName = styled.div`
  margin-top: 15px;
  font-family: "SanGiuseppe";
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--buffDark);
`;
const Title = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--buffDarker);
  margin-left: 10px;
  margin-bottom: 5px;
  letter-spacing: -1px;
  padding-bottom: 10px;
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
  color: var(--buffLight);
  position: absolute;
  padding: 5px 10px;
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
  background-color: var(--buffDark2);
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
  background-color: var(--buffDark2);
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
    color: var(--navyLighter);
    background-color: var(--buffDarker);
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
  color: var(--buffLight);
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
  background-color: var(--buff);
  color: white;
  font-size: 18px;
  font-family: "Montserrat";
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--navy);
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

export default Register;
