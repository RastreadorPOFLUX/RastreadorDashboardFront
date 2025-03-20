// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "./../../components/MenuLateral/index";
import ClimateCard from "./../../components/ClimateCard/index";
import DataCard from "../../components/DataCard";
import OperationModeCard from "../../components/OperationModeCard";
import CloudinessPluviosityCard from "../../components/CloudinessPluviosityCard";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function GeneralInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
      <OperationModeCard></OperationModeCard>
      <ClimateCard></ClimateCard>
      <DataCard></DataCard>
      <CloudinessPluviosityCard></CloudinessPluviosityCard>
    </GeneralInfoBackground>
  );
}
