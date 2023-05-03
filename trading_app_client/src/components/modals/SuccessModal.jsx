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



export default SuccessModal;
