import styled from "styled-components";
import { Wrapper } from "../Cards/style";
import { LinearProgress, linearProgressClasses } from "@mui/material";

interface Props {
  width: string;
  height?: string;
  $left: string;
  $top: string;
}

export const StyledWrapper = styled(Wrapper)<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  left: ${(props) => props.$left};
  top: ${(props) => props.$top};
  border-radius: 1.5625rem;
`;

export const GradientLinearProgress = styled(LinearProgress)(() => ({
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "var(--secondaryColor)",
    height: 15,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 55,
    background: `linear-gradient(-90deg, var(--acceptColor) ${0}% , var(--primaryColor) ${60}%, var(--alertColor) ${100}%)`,
    backgroundSize: `100%`,
    height: 15,
  },
}));

export const Text = styled.h2`
  color: var(--primaryText);
  text-align: center;
  vertical-align: text-top;
  font-size: 1.5rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  width: 15rem;
  margin-left: 24rem;
`;
