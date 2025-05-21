import styled from "styled-components";

export const GeneralInfoBackground = styled.div`
  background-color: var(--backgroundColor);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0%;
  left: 0%;
  margin: 0%;
`;

export const FirstRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  gap: 1rem;
`;

export const SecondRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
