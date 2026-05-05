// Componentes
import MenuSuperior from "./../../components/MenuSuperior/index";
import MenuLateral from "./../../components/MenuLateral/index";
import CameraCard from "../../components/CameraCard";

// Estilo
import { GeneralInfoBackground } from "./style";
import { DateProvider } from "../../components/MenuLateral/DateContext";

// Constantes
import { CAMERA_STREAM_URL } from "../../constants";

export default function CameraDisplay() {
  return (
    <GeneralInfoBackground>
      <MenuSuperior></MenuSuperior>
      <DateProvider>
        <MenuLateral screen="camera"></MenuLateral>
        <CameraCard streamUrl={CAMERA_STREAM_URL}></CameraCard>
      </DateProvider>
    </GeneralInfoBackground>
  );
}
