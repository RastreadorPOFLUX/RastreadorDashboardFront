import React from 'react'

// Estilo
import {Title, Image, Wrapper} from './style'

// Imagens
import lifLogo from "./../../assets/lifLogo.svg"

console.log(lifLogo)

function MenuSuperior() {
  return(
    <Wrapper>
        <Image src={lifLogo} /> 
      <Title>Rastreador POF LUX</Title>
    </Wrapper>
  );
}

export default MenuSuperior;