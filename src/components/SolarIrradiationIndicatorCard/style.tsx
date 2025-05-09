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
  text-align: left;
  font-size: ${(props) => props.$fontSize};
  font-family: var(--primaryFont);
  font-weight: 500;
  position: absolute;
  width: ${(props) => props.width};
  left: ${(props) => props.$left};
  margin-top: ${(props) => props.$top};
`;

export const CircularProgress = styled(Gauge)(() => ({
  [`& .${gaugeClasses.valueText}`]: {
    fontSize: 40,
    fontFamily: "var(--primaryFont)",
    transform: "translate(0px, -10px)",
  },
  [`& .${gaugeClasses.valueArc}`]: {
    fill: "var(--primaryColor)",
  },
  [`& .${gaugeClasses.referenceArc}`]: {},
}));
