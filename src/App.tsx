import "./App.css";
import { Routes, Route } from "react-router";

// Páginas
import GeneralInfo from "./pages/GeneralInfo/index";
import ElectricalInfo from "./pages/ElectricalInfo/index";
import ControlInfo from "./pages/ControlInfo/index";
import CameraDisplay from "./pages/CameraDisplay/index";

// Contextos
import { LiveDataProvider } from "./contexts/LiveDataContext";
import { OperationModeProvider } from "./contexts/OperationModeContext";

// Estilo
import { GlobalStyle } from "./global";

export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <LiveDataProvider>
        <OperationModeProvider>
          <Routes>
            <Route index path="*" element={<GeneralInfo />} />
            <Route path="/electricalInfo" element={<ElectricalInfo />} />
            <Route path="/controlInfo" element={<ControlInfo />} />
            <Route path="/cameraDisplay" element={<CameraDisplay />} />
          </Routes>
        </OperationModeProvider>
      </LiveDataProvider>
    </div>
  );
}
