import "./App.css";
import { Routes, Route } from "react-router";

// Páginas
import GeneralInfo from "./screens/GeneralInfo/index";
import ElectricalInfo from "./screens/ElectricalInfo/index";
import ControlInfo from "./screens/ControlInfo/index";

// Estilo
import { GlobalStyle } from "./global";

export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route index path="*" element={<GeneralInfo />} />
        <Route path="/electricalInfo" element={<ElectricalInfo />} />
        <Route path="/controlInfo" element={<ControlInfo />} />
      </Routes>
    </div>
  );
}
