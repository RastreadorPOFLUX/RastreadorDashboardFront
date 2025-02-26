// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
    </GeneralInfoBackground>
  );
}
