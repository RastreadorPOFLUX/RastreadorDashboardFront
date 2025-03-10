import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: var(--lightGray);
  position: absolute;
  width: 100%;
  height: 7.875rem;
  top: 0rem;
  left: 0rem;
  filter: drop-shadow(0.25rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25));
`;

export const Image = styled.img`
  height: 4.6875rem;
  width: 5.625rem;
  left: 6rem;
  top: 2.125rem;
  position: absolute;
`;

export const Title = styled.h1`
  text-align: left;
  vertical-align: text-top;
  left: 22.875rem;
  top: 0.125rem;
  position: absolute;
  width: 29.8125rem;
  font-size: 3rem;
  font-weight: 500;
  color: var(--primaryText);
  font-family: var(--primaryFont);
`;

export const DateDisplay = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  left: 58.19rem;
  top: 2.125rem;
  width: 15rem;
  height: 2.8125rem;
  position: absolute;
  color: var(--primaryText);
  font-family: var(--primaryFont);
`;

export const TrackerConnectionIcon = styled.div`
  background-color: var(--lightGray);
  height: 1.5rem;
  width: 1.5rem;
  top: 3.5625rem;
  left: 80.1875rem;
  position: absolute;
`;

export const ConnectionText = styled.h2`
  color: var(--primaryText);
  text-align: center;
  left: 2rem;
  top: -1.5rem;
  width: 2.75rem;
  height: 2.75rem;
  font-size: 1.5rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  position: absolute;
`;
