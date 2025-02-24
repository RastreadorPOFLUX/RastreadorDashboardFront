// Estilo
import {Title, Image, Wrapper, DateDisplay} from './style'

// Imagens
import lifLogo from "./../../assets/lif-logo.svg"

function MenuSuperior() {
  return(
    <Wrapper>
        <Image src={lifLogo} /> 
      <Title>Rastreador POF LUX</Title>
      <DateDisplay> 2025, 24 de Fevereiro </DateDisplay>
    </Wrapper>
  );
}

export default MenuSuperior;