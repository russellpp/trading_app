import React from "react";
import {
  CancelButton,
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  ErrorMessage,
} from "./Modals";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccess, selectStatus } from "../../redux/requestStatusReducer";

function SuccessModal() {
  const dispatch = useDispatch();
  const currentStatus = useSelector(selectStatus);
  const handleClose = () => {
    dispatch(clearSuccess());
  };

  return (
    <ModalContainer>
      <ModalHeader>Success!</ModalHeader>
      <ModalBody>
        {currentStatus?.success_message.map((msg, index) => {
          return (
            <ErrorMessage key={index}>
              <p>{msg}</p>
            </ErrorMessage>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={handleClose}>OK</CancelButton>
      </ModalFooter>
    </ModalContainer>
  );
}

const SuccessContainer = styled.div`
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

export default SuccessModal;
