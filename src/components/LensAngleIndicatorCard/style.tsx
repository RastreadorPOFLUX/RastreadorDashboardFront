import styled from "styled-components";

import { Wrapper } from "../Cards/style";
import { Gauge, gaugeClasses } from "@mui/x-charts";

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
  border-radius: 50%;
`;

export const CircularProgress = styled(Gauge)(() => ({
  [`& .${gaugeClasses.valueText}`]: {
    fontSize: 40,
    fontFamily: "var(--primaryFont)",
    transform: "translate(8px, 30px)",
  },
  [`& .${gaugeClasses.valueArc}`]: {
    fill: "var(--primaryColor)",
  },
  [`& .${gaugeClasses.referenceArc}`]: {},
}));

export const Text = styled.h3<Props>`
  color: ${(props) => props.color};
  text-align: center;
  font-size: 1rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  position: absolute;
  left: 18%;
  margin-top: 30%;
  width: 9rem;
`;
