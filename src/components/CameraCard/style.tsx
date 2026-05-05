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
  position: absolute;
  max-width: 100%;
  box-sizing: border-box;
  padding: 2rem;
`;

export const Stream = styled.video<Props>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: cover;
  display: block;
  border-radius: 1.5625rem;
`;

export const StatusBadge = styled.span<{ $live: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  background-color: ${({ $live }) =>
    $live ? "rgba(40, 200, 100, 0.15)" : "rgba(220, 50, 50, 0.15)"};
  color: ${({ $live }) => ($live ? "#28c864" : "#dc3232")};
  border: 1px solid
    ${({ $live }) => ($live ? "#28c864" : "#dc3232")};
  z-index: 10;
  user-select: none;
`;

export const OfflineOverlay = styled.div`
  position: absolute;
  inset: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  background-color: rgba(0, 0, 0, 0.55);
  color: #ccc;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  z-index: 5;
`;

