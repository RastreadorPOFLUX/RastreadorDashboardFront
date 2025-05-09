// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import SolarIrradiationCard from "../../components/SolarIrradiationCard";
import SolarIrradiationIndicatorCard from "../../components/SolarIrradiationIndicatorCard";
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
      <SolarIrradiationCard></SolarIrradiationCard>
      <SolarIrradiationIndicatorCard></SolarIrradiationIndicatorCard>
      <MotorPowerCard></MotorPowerCard>
    </GeneralInfoBackground>
  );
}
