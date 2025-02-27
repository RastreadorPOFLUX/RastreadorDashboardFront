import styled from "styled-components";

import { Wrapper } from "../MenuLateral/style";

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
  border-radius: 0.3125rem;
`;


export const Text = styled.h3<Props>`
    color: var(--primaryText);
    text-align:left;
    font-size:1.5rem;
    font-family:var(--primaryFont);
    font-weight: 500;
    position:absolute;
    width: ${(props) => props.width};
    left: ${(props) => props.left};
    margin-top: ${(props) => props.top};
`

export const WeatherIcon = styled.div`
  height: 3.625rem;
  width: 3.8125rem;
  top: 1.75rem;
  left: 25rem;
  position: absolute;
`;