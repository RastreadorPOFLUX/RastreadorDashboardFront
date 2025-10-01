import styled, { css, keyframes } from "styled-components";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

import { Wrapper } from "../Cards/style";

interface Props {
  width: string;
  height?: string;
  $left: string;
  $top: string;
  $fontSize?: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  border-radius: 50%;
`;

export const Text = styled.h3<Props>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.$fontSize};
  font-family: var(--primaryFont);
  font-weight: 500;
  position: absolute;
  width: ${(props) => props.width};
  left: ${(props) => props.$left};
  margin-top: ${(props) => props.$top};
`;

interface CircularProgressProps {
  $valueColor?: string;
}

export const CircularProgress = styled(Gauge)<CircularProgressProps>(({ $valueColor }) => ({
  [`& .${gaugeClasses.valueText}`]: {
    fontSize: 40,
    fontFamily: "var(--primaryFont)",
    transform: "translate(0px, -20px)",
  },
  [`& .${gaugeClasses.valueArc}`]: {
     fill: $valueColor || "var(--primaryColor)"
  },
  [`& .${gaugeClasses.referenceArc}`]: {},
}));
