// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import ClimateCard from "../../components/ClimateCard";
import LuminousPowerCard from "../../components/LuminousPowerCard";
import LuminousPowerIndicatorCard from "../../components/LuminousPowerIndicatorCard";
import MotorPowerCard from "../../components/MotorPowerCard";

// Estilo
import { GeneralInfoBackground } from "./style";
export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <MenuLateral></MenuLateral>
      <LuminousPowerCard></LuminousPowerCard>
      <ClimateCard></ClimateCard>
      <LuminousPowerIndicatorCard></LuminousPowerIndicatorCard>
      <MotorPowerCard></MotorPowerCard>
    </GeneralInfoBackground>
  );
}
