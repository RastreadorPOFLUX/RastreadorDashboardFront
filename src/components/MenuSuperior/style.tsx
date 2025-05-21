import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--lightGray);
  position: relative;
  width: 100%;
  height: 16%;
  filter: drop-shadow(0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Image = styled.img`
  height: 4.875rem;
  width: 8.625rem;
  position: relative;
`;

export const Title = styled.h1`
  text-align: center;
  vertical-align: text-top;
  font-size: 2.5rem;
  font-weight: 500;
  color: var(--primaryText);
  font-family: var(--primaryFont);
  position: relative;
`;

export const DateDisplay = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--primaryText);
  font-family: var(--primaryFont);
  position: relative;
`;

export const TrackerConnectionIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const ConnectionText = styled.h2`
  color: var(--primaryText);
  font-size: 1.5rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  text-align: center;
  flex: 1;
`;
