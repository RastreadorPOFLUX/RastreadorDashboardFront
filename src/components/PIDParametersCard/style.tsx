import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width?: string;
  height?: string;
  $left?: string;
  $top?: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  border-radius: 1.5625rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: ${(props) => (props.$left || props.$top ? "absolute" : "static")};
`;

export const Title = styled.h2<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-family: var(--primaryFont);
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
`;

export const Text = styled.h3<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-family: var(--primaryFont);
  font-weight: 500;
`;

export const Divider = styled.div`
  background-color: var(--secondaryColor);
  height: 0.04875rem;
  width: 100%;
  border-radius: 0.3125rem;
`;

export const Line = styled.div`
  display: flex;
  align-items: left;
  justify-content: space-around;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-around;
  width: 90%;
  height: 95%;
`;

export const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1.25rem;
  font-family: var(--primaryFont);
  background-color: transparent;
  color: var(--primaryText);
  text-align: center;

  /* Remove as setinhas (spinner) no Chrome, Safari, Edge */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Remove o spinner no Firefox */
  -moz-appearance: textfield;
`;
