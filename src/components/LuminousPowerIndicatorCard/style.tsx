import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width: string;
  height?: string;
  left: string;
  top: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  border-radius: 50%;
`;

export const Text = styled.h3<Props>`
  color: ${(props) => props.color};
  text-align: left;
  font-size: 0.875rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  position: absolute;
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  margin-top: ${(props) => props.top};
`;
