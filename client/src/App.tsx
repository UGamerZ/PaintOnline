import "./styles/app.scss";
import Tools from "./components/Tools.tsx";
import Settings from "./components/Settings.tsx";
import Canvas from "./components/Canvas.tsx";
import ModalWindow from "./components/ModalWindow.tsx";
import Snack from "./components/Snack.tsx";
const App = () => {
  return (
    <div className="app">
      <ModalWindow />
      <Settings />
      <Tools />
      <Canvas />
      <Snack />
    </div>
  );
};

export default App;
