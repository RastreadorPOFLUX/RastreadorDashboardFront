// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import LuminousPowerCard from "../../components/LuminousPowerCard";
import LuminousPowerIndicatorCard from "../../components/LuminousPowerIndicatorCard";
import MotorPowerCard from "../../components/MotorPowerCard";
import { DateProvider } from "../../components/MenuLateral/DateContext";

// Estilo
import { GeneralInfoBackground } from "./style";

export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider>
        <MenuLateral></MenuLateral>
      </DateProvider>
      <LuminousPowerCard></LuminousPowerCard>
      <LuminousPowerIndicatorCard></LuminousPowerIndicatorCard>
      <MotorPowerCard></MotorPowerCard>
    </GeneralInfoBackground>
  );
}
