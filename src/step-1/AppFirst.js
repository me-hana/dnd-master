import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "./Card";
import Box from "./Box";

const AppFirst = () => {
  const [isFirstBox, setIsFirstBox] = useState(true);
  const Item = <Card setIsFirstBox={setIsFirstBox} />;

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <Box title="box-1">{isFirstBox && Item}</Box>
        <Box title="box-2">{!isFirstBox && Item}</Box>
      </DndProvider>
    </div>
  );
};

export default AppFirst;
