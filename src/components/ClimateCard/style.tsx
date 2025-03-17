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
  border-radius: 1.5625rem;
`;

export const Text = styled.h3<Props>`
  color: var(--primaryText);
  text-align: left;
  font-size: 1.5rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  position: absolute;
  width: ${(props) => props.width};
  left: ${(props) => props.left};
  margin-top: ${(props) => props.top};
`;

export const WeatherIcon = styled.div`
  top: 0.1rem;
  left: 22rem;
  position: absolute;
`;
