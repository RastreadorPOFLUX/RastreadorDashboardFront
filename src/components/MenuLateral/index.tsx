import { Link } from "react-router";

// Estilo
import {
  Wrapper,
  Pages,
  Divider,
  Space,
  Text,
  DateInput,
  Contribuitions,
} from "./style";


function MenuLateral() {
  return (
    <Wrapper>
        <Pages>  
          <Link to="/">
            Informações Gerais
          </Link> 
        </Pages>
      <Divider></Divider>
      <Pages>      
        <Link to="/electricalInfo">
          Elétrica
        </Link>  
      </Pages>
      <Divider></Divider>
      <Pages> 
        <Link to="/controlInfo">
          Controlador
        </Link> 
      </Pages>
      <Space></Space>
      <Text> Período de Análise: </Text>
      <Text>
        Início
        <DateInput></DateInput>
        Fim
        <DateInput></DateInput>
      </Text>
      <Space></Space>
      <Contribuitions>
        @Guilherme N. Matera
        <br />
        @Mateus Lima
        <br />
        @Vinicius F. Neves
      </Contribuitions>
    </Wrapper>
  );
}

export default MenuLateral;
