// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "./../../components/MenuLateral/index";
import CameraCard from "../../components/CameraCard";

// Estilo
import { GeneralInfoBackground } from "./style";
import { DateProvider } from "../../components/MenuLateral/DateContext";

export default function CameraDisplay() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider>
        <MenuLateral></MenuLateral>
      </DateProvider>
      <CameraCard streamUrl=""></CameraCard>
    </GeneralInfoBackground>
  );
}
