import styled from 'styled-components';
import Modal from 'styled-react-modal';

export const Container = Modal.styled`
  width: 50vw;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  z-index: 999;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding: 20px;
`;

export const Header = styled.div`
  width: 100%;
  border-bottom: 1px solid #3f20ba55;
  padding-bottom: 10px;

  & > h2 {
    color: #3f20ba;
    font-size: 30px;
  }
`;

export const FormContainer = styled.div`
  margin-top: 10px;
  width: 100%;

  & > form {
    textarea {
      resize: none;
    }

    & > div {
      margin-top: 30px;
    }

    & > div#create-issue-button-container {
      display: flex;
      justify-content: flex-end;

      width: 100%;

      & > button {
        width: 20%;
        margin-left: 5px;
      }
    }
  }
`;
