import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width?: string;
  height?: string;
  $left?: string;
  $top?: string;
}

export const StyledWrapper = styled(Wrapper) <Props>`
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

export const AdjustButton = styled.button`
  background-color: var(--acceptColor);
  color: var(--white);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin-top: 50%;
  font-family: var(--primaryFont);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  height: fit-content;

  &:hover {
    background-color: #2d8e47;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background-color: var(--secondaryColor);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ColumnsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;

  &.button-column {
    flex: 0;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

export const ParamsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const BracketColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-right: 0.5rem;
`;

export const StyledBracket = styled.div`
  width: 1.5rem;
  height: 100%;
  border-right: 1px solid var(--primaryText);
  border-top-right-radius: 50% 10%;
  border-bottom-right-radius: 50% 10%;
`;
