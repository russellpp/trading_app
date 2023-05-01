import styled from "styled-components";

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border-radius: 20px;
  font-family: "Montserrat";
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  min-height: 200px;
  height: auto;
  width: 300px;
  background-color: var(--navyLighter);
  box-shadow: 0 0 0 20000px #00000076;
  transition: opacity 0.15s ease-in-out;
  opacity: 1;
  z-index: 5;
`;

const EditModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border-radius: 20px;
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  min-height: 200px;
  height: auto;
  width: 300px;
  background-color: var(--lighterGray);
  box-shadow: 0 0 0 20000px #00000076;
  opacity: 0.2;
  transition: opacity 0.15s ease-in-out;

  &.open {
    opacity: 1;
  }
`;

const ErrorModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: content-box;
  border-radius: 20px;

  border: 5px solid var(--burgundy);
  top: 40vh;
  left: 50vw;
  transform: translateX(-50%) translateY(-50%);
  min-height: 100px;
  height: auto;
  width: 450px;
  background-color: var(--lighterGray);
  transition: opacity 0.15s ease-in-out;
  z-index: 5;
`;

const ModalHeader = styled.div`
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 15px;
  font-weight: bold;
  background-color: var(--magenta);
  color: white;
`;

const ErrorModalHeader = styled.div`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 15px;
  font-weight: bold;
  background-color: var(--burgundy);
  color: white;
`;

const ModalBody = styled.div`
  padding: 15px;
  height: auto;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  font-family: "RobotoReg";
  color: var(--magenta);
  font-size: 15px;
  letter-spacing: 0px;
`;

const ModalFooter = styled.div`
  box-sizing: border-box;
  margin-bottom: 10px;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  padding: 15px;
`;

const SubmitButton = styled.button`
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  border: 1px solid var(--lightGray);
  border-radius: 5px;
  padding: 3px 10px;
  background: linear-gradient(
    to right,
    var(--lightGray) 50%,
    var(--yellow) 50%
  );
  background-size: 200% 100%;
  background-position: left center;
  color: var(--darkGray);
  transition: border 0.5s ease-in-out;
  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;

    border: 1px solid var(--yellow);
    background-position: right center;
    color: white;
    background-image: linear-gradient(
        to right,
        var(--lightGray) 50%,
        var(--yellow) 50%
      ),
      linear-gradient(to right, #fff 50%, #fff 50%);
  }
`;

const CancelButton = styled.button`
  margin-left: 10px;
  text-transform: uppercase;
  font-weight: 600;
  font-family: "Open Sans", sans-serif;
  border: 1px solid var(--buffLighter);
  border-radius: 5px;
  padding: 3px 10px;
  background: linear-gradient(
    to right,
    var(--buffLighter) 50%,
    var(--magentaLight) 50%
  );
  background-size: 200% 100%;
  background-position: left center;
  color: var(--magenta);
  transition: border 0.25s ease-in-out;
  transition: all 0.15s ease-in-out;

  &:hover {
    cursor: pointer;

    border: 1px solid var(--magenta);
    background-position: right center;
    color: white;
    background-image: linear-gradient(
        to right,
        var(--navyLighter) 50%,
        var(--magenta) 50%
      ),
      linear-gradient(to right, #fff 50%, #fff 50%);
  }
`;

const SelectContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
  > label {
    margin-bottom: 10px;
  }
`;

const Select = styled.select`
  padding: 3px 5px;
  border-radius: 4px;
  border: 1px solid gray;
  font-size: 1rem;
  margin-bottom: 2px;
`;

const Option = styled.option`
  font-size: 1rem;
  margin-right: 10px;
`;

const FormLabel = styled.label``;

const FormInput = styled.input`
  margin: 10px 0;
  height: 25px;
`;

const RadioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-right: 10px;
  > label {
    font-size: 13px;
    text-transform: uppercase;
    margin-top: 13px;
  }
  > :nth-child(7) {
    color: red;
    font-weight: 600;
  }
  > :nth-child(5) {
    color: green;
    font-weight: 600;
  }
  > :nth-child(3) {
    color: gray;
    font-weight: 600;
  }
`;

const ErrorMessage = styled.div`
  color: var(--navy);
  margin-bottom: 10px;

  > p {
    text-transform: none;
    color: var(--navy);
  }

  > ul {
    color: var(--gray);

    > li {
    }
  }
`;

export {
  ModalBody,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  FormInput,
  FormLabel,
  Option,
  Select,
  SelectContainer,
  SubmitButton,
  CancelButton,
  RadioContainer,
  ErrorModalContainer,
  ErrorModalHeader,
  EditModalContainer,
  ErrorMessage,
};
