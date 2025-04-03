// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "../../components/MenuLateral/index";
import ClimateCard from "../../components/ClimateCard";
import PIDParametersCard from "../../components/PIDParametersCard";
import AnglesCard from "../../components/AnglesCard";
import LensAngleIndicatorCard from "../../components/LensAngleIndicatorCard";
import ControlSignalsCard from "../../components/ControlSignalsCard";
import { DateProvider } from './../../components/MenuLateral/DateContext';

// Estilo
import { GeneralInfoBackground } from "./style";

export default function ControlInfo() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider>
        <MenuLateral></MenuLateral>
      </DateProvider>
      <AnglesCard></AnglesCard>
      <ClimateCard></ClimateCard>
      <PIDParametersCard></PIDParametersCard>
      <LensAngleIndicatorCard></LensAngleIndicatorCard>
      <ControlSignalsCard></ControlSignalsCard>
    </GeneralInfoBackground>
  );
}
