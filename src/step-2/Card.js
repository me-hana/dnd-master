import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "card";

const CardWrapper = styled("div")(() => ({
  backgroundColor: "#EFEFEF",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  cursor: "move",
}));

const Card = ({ id, text, index, moveCard }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
      // console.log("인덱스좀 알려줘", index);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <CardWrapper ref={ref} style={{ opacity }}>
      {text}
    </CardWrapper>
  );
};

export default Card;
