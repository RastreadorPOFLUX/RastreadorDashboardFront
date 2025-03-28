import styled from "styled-components";
import { Wrapper } from "../Cards/style";
import { LinearProgress, linearProgressClasses } from "@mui/material";

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
  border-radius: 1.5625rem;
`;

export const BorderLinearProgress = styled(LinearProgress)(() => ({
  borderRadius: 25,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'var(--secondaryColor)',
    height: 15,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 55,
    backgroundColor: 'var(--primaryColor)',
    height: 15,
  },
}));
