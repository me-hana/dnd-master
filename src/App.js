import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Goal from "./Goal";
import Card from "./Card";
import Home from "./Home";

const App = () => {
  const [isYellow, setIsYellow] = useState(true);
  const Item = <Card setIsYellow={setIsYellow} />;

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Home>{isYellow && Item}</Home>
        <Goal>{!isYellow && Item}</Goal>
      </DndProvider>
    </div>
  );
};

export default App;
