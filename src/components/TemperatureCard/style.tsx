import styled from "styled-components";

import { Wrapper } from "../Cards/style";

interface Props {
  width: string;
  height?: string;
  $left?: string;
  $top?: string;
}

interface TemperatureProps {
  $temperature: number;
}

// Função para calcular a cor baseada na temperatura
const getTemperatureColor = (temp: number): string => {
  // Temperatura ideal: 0-40°C (Verde escuro)
  if (temp <= 40) {
    return "var(--acceptColor)"; // Verde escuro (emerald-600)
  }
  // Temperatura aceitável: 40-60°C (Gradiente Verde -> Amarelo escuro)
  else if (temp <= 60) {
    const ratio = (temp - 40) / 20;
    return `hsl(${120 - (ratio * 60)}, 75%, 35%)`; // 120° (verde) -> 60° (amarelo) - mais escuro
  }
  // Temperatura elevada: 60-80°C (Gradiente Amarelo -> Laranja -> Vermelho)
  else if (temp <= 80) {
    const ratio = (temp - 60) / 20;
    return `hsl(${60 - (ratio * 45)}, 85%, 40%)`; // 60° (amarelo) -> 15° (laranja) - mais escuro
  }
  // Temperatura crítica: 80°C+ (Vermelho escuro)
  else {
    return '#dc2626'; // Vermelho escuro (red-600)
  }
};

export const StyledWrapper = styled(Wrapper) <Props>`
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
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.4rem);
  font-family: var(--primaryFont);
  font-weight: 500;
  margin: 0;
  line-height: 1.2;
  position: relative;
  width: 100%;
`;

export const TemperatureValue = styled.span<TemperatureProps>`
  color: ${(props) => getTemperatureColor(props.$temperature)};
  font-weight: 700;
  transition: color 0.3s ease;
  text-shadow: ${(props) => {
    const color = getTemperatureColor(props.$temperature);
    return `0 0 15px ${color}40`;
  }};
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
