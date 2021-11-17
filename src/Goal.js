import { useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "WHATEVER";

const GoalWrapper = styled("div")(() => ({
  height: "300px",
  width: "500px",
  borderRadius: "10px",
  border: "3px solid black",
  backgroundColor: "#cff",
}));

const Goal = ({ children }) => {
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: () => ({ name: "Dool" }),
  });

  return (
    <>
      <GoalWrapper ref={drop}>
        여기에 넣어주세요.
        {children}
      </GoalWrapper>
    </>
  );
};

export default Goal;
