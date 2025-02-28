// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import ClimateCard from "../../components/ClimateCard";
import LuminousPowerCard from "../../components/LuminousPowerCard";
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
      <MotorPowerCard></MotorPowerCard>
    </GeneralInfoBackground>
  );
}
