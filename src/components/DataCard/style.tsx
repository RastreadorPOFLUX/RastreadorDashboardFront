import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width: string;
  height?: string;
  $left: string;
  $top: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  border-radius: 1.5625rem;
`;

export const Button = styled.button<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  background-color: ${(props) => props.color};
  border-radius: 0.3125rem;
  position: absolute;
  filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
`;

export const Text = styled.h3`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 1.25rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  width: 8rem;
  margin-top: 3px;
`;
