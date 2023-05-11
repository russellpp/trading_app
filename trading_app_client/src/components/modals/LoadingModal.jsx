import React from "react";
import { ModalBody, ModalContainer, ModalHeader } from "./Modals";
import styled from "styled-components";

function LoadingModal() {
  return (
    <ModalContainer>
      <ModalBody>
        <LoadingContainer>
          <img src="./public/assets/loading.gif" alt="loading..." />
          <p>LOADING...</p>
        </LoadingContainer>
      </ModalBody>
    </ModalContainer>
  );
}

const LoadingContainer = styled.div`
  height: 180px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  > img {
    height: 180px;
  }

  > p {
    margin-top: 70px;
    text-align: center;
    font-family: "Montserrat";
    font-weight: 800;
  }
`;

export default LoadingModal;
