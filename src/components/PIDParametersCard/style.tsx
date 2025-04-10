import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width?: string;
  height?: string;
  left?: string;
  top?: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  border-radius: 1.5625rem;
`;

export const Title = styled.h2<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 2rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  margin-top: 1rem;
`;

export const Text = styled.h3<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 1.25rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  margin-top: 2px;
`;

export const Divider = styled.div`
  background-color: var(--secondaryColor);
  height: 0.04875rem;
  width: 21.8125rem;
  border-radius: 0.3125rem;
  margin-left: 0.8125rem;
`;
