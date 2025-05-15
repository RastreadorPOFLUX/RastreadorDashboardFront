import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width: string;
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
  max-width: 100%;
  box-sizing: border-box;
  padding: 2rem;
`;

export const Stream = styled.video<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  display: block;
  border-radius: 1.5625rem;
`;
