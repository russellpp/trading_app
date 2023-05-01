import React, { useEffect, useState } from "react";
import {
  CancelButton,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ErrorMessage,
} from "./Modals";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  selectError,
  selectStatus,
} from "../../redux/requestStatusReducer";

function AlertModal() {
  const dispatch = useDispatch();
  const currentError = useSelector(selectError);
  const currentStatus = useSelector(selectStatus);

  const handleCancel = () => {
    dispatch(clearError());
    console.log(currentError);
  };

  return (
    <ModalContainer>
      <ModalHeader>Error!</ModalHeader>
      <ModalBody>
        {currentError?.map((error, index) => {
          return (
            <ErrorMessage key={index}>
              <p>{error}</p>
            </ErrorMessage>
          );
        })}
      </ModalBody>
      <ModalFooter>
        <CancelButton onClick={handleCancel}>Continue</CancelButton>
      </ModalFooter>
    </ModalContainer>
  );
}

export default AlertModal;
