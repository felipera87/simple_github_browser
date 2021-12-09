import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  border-radius: 8px;
  background: #fffdf8;
  padding: 12px;
  width: 100%;

  border: 2px solid #d7d3e2;
  color: #666360;

  position: relative;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #3f20ba;
      color: #3f20ba;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #3f20ba;
    `}

  & > span {
    margin-right: 5px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #000;
    font-size: 16px;
    width: 100%;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled.div`
  position: absolute;
  bottom: -20px;

  span {
    color: #c53030;
    font-size: 13px;
  }
`;
