// Estilo
import {Title, Image, Wrapper} from './style'

// Imagens
import lifLogo from "./../../assets/lif-logo.svg"

function MenuSuperior() {
  return(
    <Wrapper>
        <Image src={lifLogo} /> 
      <Title>Rastreador POF LUX</Title>
    </Wrapper>
  );
}

export default MenuSuperior;