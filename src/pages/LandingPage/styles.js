import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100vw;

  padding: 50px 200px;
`;

export const SearchContainer = styled.div`
  width: 50%;

  & > form {
    display: flex;
    width: 100%;

    & > div.search-button-container {
      display: flex;
      align-items: center;
      margin-left: 5px;
      width: 20%;
    }
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 50px;

  position: relative;

  & > h2 {
    color: #3f20ba;
    font-size: 30px;

    & > small {
      font-size: 18px;
    }
  }

  & > button {
    background: none;
    border: none;
    height: 240px;
    font-size: 25px;
    width: 50px;
    color: #3f20ba;

    &:hover {
      color: ${shade(0.5, '#3f20ba')};
    }
  }

  & > button#button-user-previous-page {
    position: absolute;
    bottom: 0;
    left: -50px;
  }

  & > button#button-user-next-page {
    position: absolute;
    bottom: 0;
    right: -50px;
  }
`;

export const UsersBrowser = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  width: 100%;
  height: 240px;
  margin-top: 20px;
  padding: 0 25px;

  overflow-x: auto;
`;

export const UserBoxButton = styled.button`
  display: flex;
  flex-direction: column;
  background: none;
  width: 150px;
  padding: 2px;

  border-radius: 10px;

  &:not(:first-child) {
    margin-left: 10px;
  }

  ${props => {
    if (props.isSelected) {
      return css`
        border: 4px solid #3f20ba;
        box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.2);
      `;
    }

    return css`
      border: 4px solid #000;
      box-shadow: 3px 3px 2px 1px rgba(0, 0, 0, 0.2);
    `;
  }}

  & > img {
    border-radius: 10px 10px 0 0;
    width: 135px;
    height: 135px;
  }

  & > span {
    width: 100%;
    height: 40px;
    margin-top: 5px;
    font-size: 18px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1, 1.1);
    transition: all 0.2s ease-in-out;
  }
`;

export const RepositoriesContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;

  & > h2 {
    color: #3f20ba;
    font-size: 30px;

    & > small {
      font-size: 18px;
    }
  }

  & > ul {
    width: 100%;
    list-style: none;
    margin-top: 20px;
    height: 300px;

    li {
      width: 100%;

      & > a {
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        color: #000;

        padding: 10px;
        cursor: pointer;

        &:hover {
          background-color: ${shade(0.2, '#3f20ba')};
          color: #fff;
        }
      }
    }
  }
`;

export const EmptyUsersList = styled.div`
  width: 100%;
  height: 240px;

  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    display: flex;
    align-items: center;
    font-size: 30px;

    & > svg {
      margin-left: 10px;
    }
  }
`;
