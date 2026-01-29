import styled from "styled-components";

export const Wrapper = styled.section`
  background-color: var(--lightGray);
  height: 85%;
  padding-bottom: 6.8%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  filter: drop-shadow(0.25rem 0.25rem 0.15rem rgba(0, 0, 0, 0.25));
  position: relative;
  gap: 0.1rem;
`;

export const Divider = styled.div`
  background-color: var(--secondaryColor);
  height: 0.05rem;
  width: 80%;
  border-radius: 0.3125rem;
  margin-left: 10%;
  position: relative;
`;

export const Screens = styled.h3`
  color: ${(props) => props.color};
  margin-left: 10%;
  text-align: left;
  font-size: 1.1rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  width: 100%;
  position: relative;
  transition-duration: 0.4s;

  &:hover {
    color: var(--primaryColor);
    font-weight: 540;
  }
`;

export const Text = styled.h3`
  margin-left: 10%;
  text-align: left;
  font-weight: 500;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1rem;
  font-family: var(--primaryFont);
  color: var(--primaryText);
`;

export const DateInput = styled.input.attrs({ type: "date" })`
  padding: 0.625rem;
  border: 1px solid var(--backgroundColor);
  border-radius: 0.3125rem;
  font-size: 1rem;
  font-family: var(--primaryFont);
  width: 80%;
  flex: 1;
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
  margin-left: 10%;
  color: var(--primaryText);
  text-align: left;
  font-size: 0.75rem;
  font-family: var(--primaryFont);
  font-weight: 500;
  position: relative;
`;
