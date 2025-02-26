import "./App.css";
import GeneralInfo from "./screens/GeneralInfo/index";
import ElectricalInfo from "./screens/ElectricalInfo/index";
import { GlobalStyle } from "./global";

export default function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <GeneralInfo></GeneralInfo>
    </div>
  );
}
