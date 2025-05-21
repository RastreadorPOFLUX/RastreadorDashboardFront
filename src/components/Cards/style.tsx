import styled from "styled-components";

interface Props {
  $backgroundcolor: string;
}

export const Wrapper = styled.div<Props>`
  background-color: ${(props) => props.$backgroundcolor};
  filter: drop-shadow(0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
  position: absolute;
`;
