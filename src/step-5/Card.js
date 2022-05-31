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
  backgroundColor: "inherit",
}));

const Card = ({
  lid,
  val,
  index,
  moveCard,
  findCard,
  showCards,
  printPreNext,
}) => {
  const dragRef = useRef(null);
  const previewRef = useRef(null);
  const originalIndex = findCard(lid).index;

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: { lid, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { lid: droppedId, originalIndex } = item;
      if (!monitor.didDrop()) {
        console.log("금지된 영역으로의 Drop");
        moveCard(droppedId, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: () => true,
    hover({ lid: draggedId }) {
      if (draggedId !== lid) {
        const { index: overIndex } = findCard(lid);
        moveCard(draggedId, overIndex);
        console.log("useDrop hover");
      }
    },
    drop() {
      // const { index: overIndex } = findCard(lid);
      console.log("제대로 떨어뜨리셨네요");
      printPreNext();
      showCards();
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(dragRef);
  drop(preview(previewRef));

  return (
    <CardWrapper ref={previewRef} style={{ opacity }}>
      <HandleWrapper ref={dragRef} />
      <TextWrapper>{val}</TextWrapper>
    </CardWrapper>
  );
};

export default Card;
