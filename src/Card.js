import { useDrag } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "WHATEVER";
const index = {
  no: 1,
  name: "my_name",
  test: "my_test",
};

const CardWrapper = styled("div")(() => ({
  height: "100px",
  width: "200px",
  borderRadius: "10px",
  backgroundColor: "#fcf",
}));

const Card = ({ setIsYellow }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: index,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        console.log("옮겨짐!");
        const dropResult = monitor.getDropResult();
        if (dropResult && dropResult.name === "Hannah") {
          setIsYellow(true);
        } else {
          setIsYellow(false);
        }
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <CardWrapper
        ref={drag}
        style={{ opacity, color: "grey" }}
        onClick={() => {
          alert("클릭했따고!");
        }}
      >
        Card
      </CardWrapper>
    </>
  );
};

export default Card;
