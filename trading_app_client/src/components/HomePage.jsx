import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import Login from "./home/Login";
import Register from "./home/Register";
import styled from "styled-components";
import { keyframes, css } from "styled-components";
import { selectCurrentPage } from "../redux/navigationReducer";
import HomeHeader from "./home/HomeHeader";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import HomeContent from "./home/HomeContent";
import Verify from "./home/Verify";
import Reset from "./home/Reset";

function HomePage() {
  const currentPage = useSelector(selectCurrentPage);

  return (
    <PageWrapper>
      <HomeHeader />
      <Body>
        <ClipSvg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          delay={currentPage !== "home" ? 0.2 : 0}
          currentPage={currentPage}
        >
          <path
            fill="#cc5a71"
            fillOpacity="0.3"
            d="M0,0L1440,400L1440,0L0,0Z"
          ></path>
        </ClipSvg>
        <ClipSvg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          delay={currentPage !== "home" ? 0.4 : 0}
          currentPage={currentPage}
        >
          <path
            fill="#5c1e29"
            fillOpacity="0.3"
            d="M0,500L1440,220L1440,0L0,0Z"
          ></path>
        </ClipSvg>
        <ClipSvgBot
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 600"
          delay={currentPage === "home" ? 0.3 : 0}
          currentPage={currentPage}
        >
          <path
            fill="#818807"
            transform="scale(1, -1) translate(0, -600)"
            fillOpacity="0.5"
            d="M0,0L300,0L1440,220L1440,0Z"
          ></path>
        </ClipSvgBot>
        <AnimatePresence mode="wait">
          {currentPage !== "home" ? (
            <AnimatedFormContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify/*" element={<Verify />} />
                <Route path="/reset/*" element={<Reset />} />
              </Routes>
            </AnimatedFormContainer>
          ) : (
            <HomeContent
              iconAnimation={{
                initial: { y: 100, x: 100, opacity: 0.5 },
                animate: { y: 0, x: 0, opacity: 1 },
                exit: { y: -100, x: -100, opacity: 0 },
                transition: { duration: 1 },
              }}
            />
          )}
        </AnimatePresence>
      </Body>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Body = styled.div`
  flex: 1;
  background-color: var(--magentaLightest);
  overflow: hidden;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  width: 1000px;
  border-radius: 20px;
  box-shadow: 0 0 0 20000px #0000003d;
`;

const AnimatedFormContainer = motion(FormContainer);

const ClipSvg = styled.svg`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  top: 70px;
  min-width: 100vw;
  min-height: 400px;
  opacity: 0;

  animation: ${(props) =>
    props.delay !== 0
      ? css`
          ${keyframes`
            from {
              opacity: 0;
              transform: translate(-50%, -100%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          `} 0.5s forwards ${props.delay}s
        `
      : ""};

  ${(props) =>
    props.currentPage === "home"
      ? css`
          animation: ${keyframes`
            from {
              opacity: 1;
              transform: translate(-50%, 0);
            }
            to {
              opacity: 0;
              transform: translate(-50%, -100%);
            }
          `} 0.5s forwards ${props.delay}s;
        `
      : ""};
`;

const ClipSvgBot = styled.svg`
  position: absolute;
  z-index: 1;
  transform: translateX(-50%);
  left: 50%;
  bottom: 0px;
  min-width: 100vw;
  min-height: 400px;
  opacity: 0;

  animation: ${(props) =>
    props.delay !== 0
      ? css`
          ${keyframes`
            from {
              opacity: 0;
              transform: translate(-50%, 100%);
            }
            to {
              opacity: 1;
              transform: translate(-50%, 0);
            }
          `} 0.5s forwards ${props.delay}s
        `
      : ""};

  ${(props) =>
    props.currentPage !== "home"
      ? css`
          animation: ${keyframes`
            from {
              opacity: 1;
              transform: translate(-50%, 0);
            }
            to {
              opacity: 0;
              transform: translate(-50%, 100%);
            }
          `} 0.5s forwards ${props.delay}s;
        `
      : ""};
`;

export default HomePage;
