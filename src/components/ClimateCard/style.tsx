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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
`;

export const Text = styled.h3<Props>`
  color: var(--primaryText);
  text-align: left;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-family: var(--primaryFont);
  font-weight: 500;
  margin: 0;
  line-height: 1.2;
  position: relative;
  width: ${(props) => props.width};
  left: ${(props) => props.$left};
  margin-top: ${(props) => props.$top};
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

export const WeatherIcon = styled.div`
  left: 75%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: clamp(3rem, 6vw, 5rem); // tamanho responsivo
  height: clamp(3rem, 6vw, 5rem); // para manter proporção

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.3s ease-in-out;
  }

  img:hover {
    transform: scale(1.1);
  }
`;
