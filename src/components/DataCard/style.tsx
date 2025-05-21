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
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
`;

export const Button = styled.button<Props>`
  background-color: ${(props) => props.color};
  width: 40%;
  height: 60%;
  position: relative;
  border-radius: 0.3125rem;
  filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Text = styled.h3`
  color: ${(props) => props.color};
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-family: var(--primaryFont);
  font-weight: 500;
  line-height: 1.2;
  width: 100%;
  position: relative;
`;
