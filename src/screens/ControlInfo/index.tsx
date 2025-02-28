// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import ClimateCard from "../../components/ClimateCard";
import PIDParametersCard from "../../components/PIDParametersCard";
import AnglesCard from "../../components/AnglesCard";
import LensAngleIndicatorCard from "../../components/LensAngleIndicatorCard";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
      <AnglesCard></AnglesCard>
      <ClimateCard></ClimateCard>
      <PIDParametersCard></PIDParametersCard>
      <LensAngleIndicatorCard></LensAngleIndicatorCard>
    </GeneralInfoBackground>
  );
}
