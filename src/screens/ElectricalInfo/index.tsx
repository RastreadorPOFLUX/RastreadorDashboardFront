// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import ClimateCard from "../../components/ClimateCard";
import LuminousPowerCard from "../../components/LuminousPower";
import MotorPower from "../../components/MotorPower";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
      <LuminousPowerCard></LuminousPowerCard>
      <ClimateCard></ClimateCard>
      <MotorPower></MotorPower>
    </GeneralInfoBackground>
  );
}
