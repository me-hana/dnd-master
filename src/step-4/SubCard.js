import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { styled } from "@mui/material/styles";

const ITEM_TYPE = "subcard";

const CardWrapper = styled("div")(() => ({
  marginLeft: "2rem",
  marginBottom: ".1rem",
  display: "flex",
  alignItems: "center",
  height: "45px",
  backgroundColor: "#EFEFEF",
}));

const HandleWrapper = styled("div")(() => ({
  display: "inline-block",
  width: "15px",
  height: "45px",
  backgroundColor: "thistle",
  cursor: "move",
}));

const TextWrapper = styled("div")(() => ({
  paddingLeft: 10,
  display: "inline-block",
}));

const SubCard = ({ index, id, subText, moveSub, findSub, showSubCards }) => {
  const dragRef = useRef(null);
  const previewRef = useRef(null);
  const originalIndex = findSub(id).index;

  const [{ isDragging }, drag, preview] = useDrag({
    type: ITEM_TYPE,
    item: { id, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const { id: droppedId, originalIndex } = item;
      if (!monitor.didDrop()) {
        console.log("금지된 영역으로의 Drop");
        moveSub(droppedId, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: () => true,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findSub(id);
        moveSub(draggedId, overIndex);
        console.log("useDrop hover");
        console.log(overIndex);
      }
    },
    drop() {
      console.log("제대로 떨어뜨린 거 맞음!!");
      showSubCards();
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(dragRef);
  drop(preview(previewRef));

  return (
    // <>
    <CardWrapper ref={previewRef} style={{ opacity }}>
      <HandleWrapper ref={dragRef} />
      <TextWrapper>{subText}</TextWrapper>
    </CardWrapper>
    // </>
  );
};

export default SubCard;
