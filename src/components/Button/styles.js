import styled, { css, keyframes } from 'styled-components';
import { shade } from 'polished';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 4px;
  position: relative;

  transition: background-color 0.2s;

  ${props => {
    if (props.outline) {
      return css`
        color: #3f20ba;
        background: transparent;
        border: 2px solid #3f20ba;
      `;
    }
    return css`
      color: #fff;
      background: #3f20ba;
      border: 0;
    `;
  }}

  height: 40px;
  padding: 0 16px;
  font-weight: 600;

  &:hover {
    background: ${shade(0.2, '#3f20ba')};
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  position: absolute;

  top: 5px;

  &:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    border: 6px solid #fff;

    animation: ${spin} 1.2s linear infinite;

    border-color: #fff transparent #fff transparent;
    height: 15px;
    width: 15px;
  }
`;
