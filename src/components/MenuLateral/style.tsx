import styled from "styled-components";

export const Wrapper = styled.section`
  background-color: var(--lightGray);
  height: 100%;
  width: 18.4375rem;
  filter: drop-shadow(0.25rem 0.25rem 0.15rem rgba(0, 0, 0, 0.25));
  top: 7.785rem;
  position: absolute;
`;

export const Divider = styled.div`
  background-color: var(--secondaryColor);
  height: 0.04875rem;
  width: 14.8125rem;
  border-radius: 0.3125rem;
  margin-left: 1.8125rem;
`;

export const Pages = styled.h3`
  color: var(--primaryText);
  text-align: left;
  vertical-align: text-top;
  font-size: 1.25rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  width: 12rem;
  margin-left: 2.6875rem;
  transition-duration: 0.4s;

  &:hover {
    color: var(--secondaryColor);
    font-weight: 540;
  }
`;

export const Space = styled.div`
  margin-top: 3rem;
`;

export const Text = styled.h3`
  color: var(--primaryText);
  text-align: left;
  vertical-align: text-top;
  font-size: 1.25rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  width: 12rem;
  margin-left: 2.6875rem;
`;

export const DateInput = styled.input.attrs({ type: "date" })`
  padding: 0.625rem;
  border: 0.0625rem solid var(--backgroundColor);
  border-radius: 0.3125rem;
  font-size: 1rem;
  font-family: var(--primaryFont);
  width: 12.5rem;
  color: var(--primaryText);
  background-color: var(--backgroundColor);

  &:focus {
    border-color: var(--secondaryColor);
    box-shadow: 0 0 0.3125rem var(--secondaryColor);
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.5); /* Changes the color of the calendar icon */
  }
`;

export const Contribuitions = styled.h3`
  color: var(--primaryText);
  text-align: left;
  font-size: 1rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  width: 12rem;
  margin-left: 2.6875rem;
`;
