import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  goToHomePage,
  goToLoginPage,
  goToRegisterPage,
  selectCurrentPage,
} from "../../redux/navigationReducer";
import { AnimatePresence, motion } from "framer-motion";

function HomeContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(selectCurrentPage);

  const handleGoToLoginPage = () => {
    dispatch(goToLoginPage());
    navigate("/home/login");
  };

  const handleGoToRegisterPage = () => {
    dispatch(goToRegisterPage());
    navigate("/home/register");
  };

  return (
    <ContentWrapper
      mode="wait"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Icon
        initial={{ y: 100, x: 100, opacity: 0.5 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <Title
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        COIN·SWIFT
      </Title>

      <MessageWrapper>
        <Message1
          initial={{ y: 0, x: 100, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Buy & Sell Digital Assets in the Philippines
        </Message1>
        <Message2
          initial={{ y: 0, x: 100, opacity: 0 }}
          animate={{ y: 0, x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          CoinSwift is the easiest, safest, and fastest way to buy and sell
          cryptocurrency. Our goal is to provide direct and regulated access to
          the digital asset world.
        </Message2>
        <NavigationContainer
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <ButtonTitle>TRADE NOW</ButtonTitle>
          <ButtonLogin onClick={handleGoToLoginPage}>Login</ButtonLogin>
          <ButtonRegister onClick={handleGoToRegisterPage}>
            Register
          </ButtonRegister>
        </NavigationContainer>
        <Tagline
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Trade at the speed of the wind with Coinswift - your all-in-one crypto
          trading app
        </Tagline>
      </MessageWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled(motion.div)`
  color: var(--navy);
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: 35% 35% 10% 30%;
  justify-items: center;
  align-items: center;
  grid-template-areas:
    "intro icon"
    "intro icon"
    "intro icon"
    "intro title";
`;

const Icon = styled(motion.div)`
  z-index: 2;
  width: 45rem;
  height: 45rem;
  background-image: url("/assets/icon-crop-magenta.svg");
  background-size: cover;
  margin-top: 130px;
  margin-right: 20px;
  grid-area: icon;
`;

const Title = styled(motion.div)`
  z-index: 2;
  grid-area: title;
  margin-bottom: 20px;
  margin-right: 30px;
  justify-self: right;
  font-family: "Montserrat", sans-serif;
  font-size: 3.5rem;
  font-weight: 600;
  color: var(--blushDark);
`;

const MessageWrapper = styled(motion.div)`
  grid-area: intro;
  align-self: flex-start;
  justify-self: flex-start;
  margin-top: 130px;
  margin-left: 150px;
  display: flex;
  flex-direction: column;
`;

const Message1 = styled(motion.div)`
  z-index: 2;
  font-family: "RobotoBlack";
  justify-self: left;
  font-size: 4rem;
  width: 720px;
  text-align: left;
  color: var(--navy);
`;

const Message2 = styled(motion.div)`
  z-index: 2;
  font-family: "RobotoReg";
  margin-top: 30px;
  align-self: flex-start;
  justify-self: left;
  font-size: 1.8rem;
  width: 900px;
  text-align: left;
`;

const Tagline = styled(motion.div)`
  z-index: 2;
  font-family: "RobotoThin";
  font-weight: bolder;
  color: var(--navy);
  margin-top: 30px;
  margin-left: 90px;
  font-size: 1.3rem;
  grid-area: tagline;
  align-self: flex-start;
  text-align: center;
  max-width: 400px;
`;

const NavigationContainer = styled(motion.div)`
  z-index: 2;
  display: grid;
  border-radius: 20px;
  margin-top: 60px;
  background-color: var(--navyDark);
  width: 600px;
  height: 200px;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  grid-template-areas:
    "title title"
    "button1 button2";

  &:hover {
    & > span {
      color: var(--icterineDark);
    }
  }
`;

const ButtonTitle = styled.span`
  font-family: "Montserrat", sans-serif;
  text-transform: uppercase;
  align-self: flex-end;
  justify-self: center;
  grid-area: title;
  font-size: 2.3rem;
  color: var(--navyLighter);
  font-weight: 700;
  margin-bottom: 25px;
  transition: all 0.2s ease-out;
`;

const ButtonLogin = styled.div`
  z-index: 3;
  box-sizing: border-box;
  background-color: var(--blush);
  height: 60px;
  width: 250px;
  padding: 15px 60px;
  color: var(--navy);
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  text-align: right;
  text-transform: uppercase;
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
  grid-area: button1;
  justify-self: right;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: var(--icterineLight);
    color: var(--navyDark);
    font-size: 1.55rem;
  }
`;
const ButtonRegister = styled.div`
  z-index: 3;
  box-sizing: border-box;
  background-color: var(--blush);
  height: 60px;
  width: 250px;
  padding: 15px 30px;
  color: var(--navy);
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
  grid-area: button2;
  justify-self: left;
  margin-left: 10px;
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover {
    background-color: var(--icterineLight);
    color: var(--navyDark);
    font-size: 1.55rem;
  }
`;

export default HomeContent;
