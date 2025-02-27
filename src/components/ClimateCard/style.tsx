import styled from "styled-components";

import { Wrapper } from "../MenuLateral/style";

interface Props {
  width: string;
  height: string;
  left: string;
  top: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
  border-radius: 0.3125rem;
`;
