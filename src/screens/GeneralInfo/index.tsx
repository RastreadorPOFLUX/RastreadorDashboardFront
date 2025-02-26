// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "./../../components/MenuLateral/index";
import ClimateCard from "./../../components/ClimateCard/index";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function GeneralInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
      <ClimateCard></ClimateCard>
    </GeneralInfoBackground>
  );
}
