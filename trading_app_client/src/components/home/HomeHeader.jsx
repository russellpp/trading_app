import React from "react";
import {
  goToHomePage,
  goToLoginPage,
  goToRegisterPage,
  selectCurrentPage,
} from "../../redux/navigationReducer";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

function HomeHeader() {
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

  const handleGoToHomePage = () => {
    dispatch(goToHomePage());
    navigate("/");
  };

  return (
    <Header>
      <TitleWrapper>
        <Icon />
        <Title>COIN·SWIFT</Title>
      </TitleWrapper>
      <OptionsWrapper>
        <Option onClick={handleGoToHomePage} current={currentPage === "home"}>
          Home
        </Option>
        <Option onClick={handleGoToLoginPage} current={currentPage === "login"}>
          Login
        </Option>
        <Option
          onClick={handleGoToRegisterPage}
          current={currentPage === "register"}
        >
          Register
        </Option>
      </OptionsWrapper>
    </Header>
  );
}

const Header = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--navyDark);
  font-family: "Montserrat", sans-serif;
  font-size: 30px;
  font-weight: 500;
  color: var(--navyDarker);
  z-index: 2;
`;

const OptionsWrapper = styled.div`
  display: flex;
  margin-right: 80px;
  justify-content: flex-end;
  align-items: center;
`;

const Option = styled.p`
  margin-left: 20px;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${(props) =>
    props.current ? "var(--icterineLight)" : "var(--navyLighter)"};
  cursor: pointer;
  padding: 5px 25px;
  transition: all 0.2s ease-out;
  border-radius: 10px;

  &:hover {
    color: var(--navyDark);
    background-color: var(--icterineDark);
  }
`;

const Title = styled.span`
  font-family: "SanGiuseppe";
  font-size: 25px;
  color: var(--white);
  letter-spacing: 7px;
  font-weight: 800;
  margin-top: 5px;
`;

const TitleWrapper = styled.div`
  margin-left: 60px;
  display: flex;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url("/src/assets/icon-whiteout.svg");
  background-size: cover;
  margin-right: 20px;
`;

export default HomeHeader;
