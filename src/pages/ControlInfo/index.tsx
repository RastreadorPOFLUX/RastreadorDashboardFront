// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import PIDParametersCard from "../../components/PIDParametersCard";
import AnglesCard from "../../components/AnglesCard";
import ControlSignalsCard from "../../components/ControlSignalsCard";
import { DateProvider } from "./../../components/MenuLateral/DateContext";

// Estilo
import { GeneralInfoBackground } from "./style";
import { FirstRow, SecondRow } from "../ControlInfo/style";

export default function ControlInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider>
        <MenuLateral screen="control"></MenuLateral>
        <FirstRow>
          <AnglesCard></AnglesCard>
          <PIDParametersCard></PIDParametersCard>
        </FirstRow>
        <SecondRow>
          <ControlSignalsCard></ControlSignalsCard>
        </SecondRow>
      </DateProvider>
    </GeneralInfoBackground>
  );
}
