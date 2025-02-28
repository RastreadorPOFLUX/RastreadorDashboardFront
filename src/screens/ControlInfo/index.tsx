// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import ClimateCard from "../../components/ClimateCard";
import PIDParametersCard from "../../components/PIDParametersCard";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
      <ClimateCard></ClimateCard>
      <PIDParametersCard></PIDParametersCard>
    </GeneralInfoBackground>
  );
}
