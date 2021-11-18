import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import List from "./List";

const AppSecond = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <List />
      </DndProvider>
    </div>
  );
};

export default AppSecond;
