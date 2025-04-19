// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import SolarIrrandianceCard from "../../components/SolarIrrandianceCard";
import SolarIrrandianceIndicatorCard from "../../components/SolarIrrandianceIndicatorCard";
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
      <SolarIrrandianceCard></SolarIrrandianceCard>
      <SolarIrrandianceIndicatorCard></SolarIrrandianceIndicatorCard>
      <MotorPowerCard></MotorPowerCard>
    </GeneralInfoBackground>
  );
}
