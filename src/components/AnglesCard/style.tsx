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
  position: absolute;
`;

export const Title = styled.h2<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: clamp(0.5rem, 2vw, 1.25rem);
  font-family: var(--primaryFont);
  margin: 2% 0 0 0;
  padding:0%;
  font-weight: 500;
`;
