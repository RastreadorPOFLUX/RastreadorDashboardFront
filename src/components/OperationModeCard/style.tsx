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
  background-color: ${(props) => props.$backgroundcolor};
  border-radius: 1.5625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
`;

export const Button = styled.button<Props>`
  background-color: ${(props) => props.color};
  width: 40%;
  height: 60%;
  border-radius: 0.3125rem;
  filter: drop-shadow(0 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Text = styled.h3<Props>`
  color: ${(props) => props.color};
  font-size: clamp(1rem, 2vw, 1rem);
  font-family: var(--primaryFont);
  font-weight: 500;
  margin: 0;
  line-height: 1.2;
  text-align: center;
`;

export const Title = styled.h2<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.75rem);
  font-family: var(--primaryFont);
  font-weight: 500;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding-bottom: 0%;
  gap: 1rem;
`;

export const StyledInput = styled.input`
  width: 5rem;
  padding: 0.4rem;
  border-radius: 0.3125rem;
  border: 1px solid #ccc;
  font-family: var(--primaryFont);
  font-size: 1rem;
  text-align: center;
  background-color: var(--backgroundCards);
  color: var(--primaryText);
`;

export const StyledSubmitButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 0.3125rem;
  background-color: var(--primaryColor);
  color: white;
  font-family: var(--primaryFont);
  font-weight: 500;
  border: none;
  cursor: pointer;
  filter: drop-shadow(0 0.2rem 0.2rem rgba(0, 0, 0, 0.2));

  &:hover {
    opacity: 0.9;
  }
`;
