import styled from "styled-components";
import { Wrapper } from "../Cards/style";

interface Props {
  width: string;
  height?: string;
  $left: string;
  $top: string;
}

export const StyledWrapper = styled(Wrapper) <Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  border-radius: 1.5625rem;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;


export const Text = styled.h2`
  color: var(--primaryText);
  text-align: center;
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-family: var(--primaryFont);
  font-weight: 500;
`;

interface ToggleProps {
  $isOff: boolean;
}

export const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const ToggleSwitch = styled.div<ToggleProps>`
  position: relative;
  width: 4rem;
  height: 2rem;
  background: ${(props) => props.$isOff
    ? 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'
    : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'};
  border-radius: 2rem;
`;

export const ToggleSlider = styled.div<ToggleProps>`
  position: absolute;
  top: 0.25rem;
  left: ${(props) => props.$isOff ? 'calc(100% - 1.75rem)' : '0.25rem'};
  width: 1.5rem;
  height: 1.5rem;
  background: white;
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.75rem;
    height: 0.75rem;
    background: ${(props) => props.$isOff
    ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'};
    border-radius: 50%;
    opacity: 0.3;
  }
`;

export const StatusText = styled.span<ToggleProps>`
  color: ${(props) => props.$isOff ? '#22c55e' : '#ef4444'};
  font-family: var(--primaryFont);
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
