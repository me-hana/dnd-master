import { useDrag } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "card";
const index = {
  no: 1,
  name: "my_name",
  test: "my_test",
};

const CardWrapper = styled("div")(() => ({
  height: "50px",
  width: "100px",
  borderRadius: "10px",
  backgroundColor: "#fcf",
  padding: 10,
}));

const Card = ({ setIsFirstBox }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: index,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        console.log("moved!");
        const dropResult = monitor.getDropResult();
        if (dropResult && dropResult.name === "box-1") {
          setIsFirstBox(true);
        } else {
          setIsFirstBox(false);
        }
      }
    },
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <CardWrapper
        ref={drag}
        style={{ opacity }}
        onClick={() => {
          alert("click item!");
        }}
      >
        Card
      </CardWrapper>
    </>
  );
};

export default Card;
