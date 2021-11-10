import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Home from "./Home";

const App = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Home />
      </DndProvider>
    </div>
  );
};

export default App;
