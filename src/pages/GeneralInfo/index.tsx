// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "./../../components/MenuLateral/index";
import ClimateCard from "./../../components/ClimateCard/index";
import DataCard from "../../components/DataCard";
import OperationModeCard from "../../components/OperationModeCard";
import CloudinessCard from "../../components/CloudinessCard";
import { DateProvider } from "../../components/MenuLateral/DateContext";

// Estilo
import { GeneralInfoBackground, FirstRow, SecondRow } from "./style";

export default function GeneralInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider>
        <MenuLateral></MenuLateral>
        <FirstRow>
          <OperationModeCard></OperationModeCard>
          <ClimateCard></ClimateCard>
          <DataCard></DataCard>
        </FirstRow>
        <SecondRow>
        <CloudinessCard></CloudinessCard>
        </SecondRow>
        </DateProvider>
    </GeneralInfoBackground>
  );
}
