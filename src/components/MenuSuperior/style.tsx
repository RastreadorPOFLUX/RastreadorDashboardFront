import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  color: var(--primaryText);
  font-family: var(--primaryFont);
`
export const Image = styled.img`
    height:4.6875rem;
    width:5.625rem;
    left:6rem;
    top:2.125rem;
    position: absolute;
`
export const Wrapper = styled.section`
    background-color: #f6f6f6;
    position:fixed;
    width:100%;
    height:7.875rem;
    top:0rem;
    left:0rem;
    filter:drop-shadow(0.25rem 0.25rem 0.25rem rgba(0,0,0,0.25));
`