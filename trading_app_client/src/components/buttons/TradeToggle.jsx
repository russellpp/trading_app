import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  height: 70px;
  border-radius: 35px;
  background-color: ${({ theme }) => theme.toggleBackgroundColor};
  overflow: hidden;
  width: 250px;
`;

const ToggleButton = styled.button`
  height: 100%;
  flex: 1;
  font-family: "Montserrat";
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 700;
  border: none;
  outline: none;
  background-color: ${({ active, theme }) =>
    active ? theme.toggleActiveColor : "transparent"};
  color: ${({ active, theme }) =>
    active ? theme.toggleActiveTextColor : theme.toggleTextColor};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:first-of-type {
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }

  &:last-of-type {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }

  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.toggleActiveColor : theme.toggleHoverColor};
    color: ${({ active, theme }) =>
      active ? theme.toggleActiveTextColor : theme.toggleHoverTextColor};
  }
`;

const theme = {
  toggleBackgroundColor: "var(--icterineDark)",
  toggleTextColor: "var(--icterine)",
  toggleHoverColor: "var(--navyLighter)",
  toggleHoverTextColor: "#333",
  toggleActiveColor: "var(--navyDark)",
  toggleActiveTextColor: "var(--icterine)",
};

const TradeToggle = ({ onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    onChange(index === 0 ? "buy" : "sell");
  };

  return (
    <ThemeProvider theme={theme}>
      <ToggleContainer>
        <ToggleButton active={activeIndex === 0} onClick={() => handleClick(0)}>
          Buy
        </ToggleButton>
        <ToggleButton active={activeIndex === 1} onClick={() => handleClick(1)}>
          Sell
        </ToggleButton>
      </ToggleContainer>
    </ThemeProvider>
  );
};

export default TradeToggle;
