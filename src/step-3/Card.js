import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "card";

const CardWrapper = styled("div")(() => ({
  marginBottom: ".5rem",
  display: "flex",
  alignItems: "center",
  height: "45px",
  backgroundColor: "#EFEFEF",
}));

const HandleWrapper = styled("div")(() => ({
  display: "inline-block",
  width: "15px",
  height: "45px",
  backgroundColor: "#fca",
  cursor: "move",
}));

const TextWrapper = styled("div")(() => ({
  paddingLeft: 10,
  display: "inline-block",
}));

const Card = ({ id, text, index, moveCard, showCards }) => {
  const dragRef = useRef(null);
  const previewRef = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    collect(monitor) {
      return { handlerId: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      if (!previewRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = previewRef.current?.getBoundingClientRect();
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
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        showCards();
      }
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(dragRef);
  drop(preview(previewRef));

  return (
    <CardWrapper ref={previewRef} style={{ opacity }}>
      <HandleWrapper ref={dragRef} />
      <TextWrapper>{text}</TextWrapper>
    </CardWrapper>
  );
};

export default Card;
