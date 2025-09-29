// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import SolarIrradiationCard from "../../components/SolarIrradiationCard";
import SolarIrradiationIndicatorCard from "../../components/SolarIrradiationIndicatorCard";
import MotorPowerCard from "../../components/MotorPowerCard";
import { DateProvider } from "../../components/MenuLateral/DateContext";

// Estilo
import { GeneralInfoBackground } from "./style";
import { FirstRow, SecondRow } from "../ElectricalInfo/style";

export default function ElectricalInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider screen="electrical">
        <MenuLateral screen="electrical"></MenuLateral>
      <FirstRow>
        <SolarIrradiationCard></SolarIrradiationCard>
        <SolarIrradiationIndicatorCard></SolarIrradiationIndicatorCard>
      </FirstRow>
      <SecondRow>
        <MotorPowerCard></MotorPowerCard>
      </SecondRow>
      </DateProvider>
    </GeneralInfoBackground>
  );
}
