import { useRef, useState, useCallback } from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { styled } from "@mui/material/styles";
import SubCard from "./SubCard";

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
  backgroundColor: "#fcc",
  cursor: "move",
}));

const TextWrapper = styled("div")(() => ({
  paddingLeft: 10,
  display: "inline-block",
}));

const Card = ({ index, id, text, subs, moveCard, findCard, showCards }) => {
  const dragRef = useRef(null);
  const previewRef = useRef(null);
  const originalIndex = findCard(id).index;
  const [subCards, setSubCards] = useState(subs);

  // SubCard Func
  const findSub = useCallback(
    (id) => {
      const sub = subCards.filter((s) => s.subId === id)[0];
      return {
        sub,
        index: subCards.indexOf(sub),
      };
    },
    [subCards]
  );

  const moveSub = useCallback(
    (id, atIndex) => {
      const { sub, index } = findSub(id);
      setSubCards(
        update(subCards, {
          $splice: [
            [index, 1],
            [atIndex, 0, sub],
          ],
        })
      );
      console.log(subCards);
    },
    [findSub, subCards, setSubCards]
  );

  const showSubCards = () => {
    console.log("subCards 상태는????", subCards);
  };

  // Card DnD
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
        moveCard(droppedId, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: () => true,
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findCard(id);
        moveCard(draggedId, overIndex);
        console.log("useDrop hover");
      }
    },
    drop() {
      console.log("제대로 떨어뜨리셨네요");
      showCards();
    },
  });

  const opacity = isDragging ? 0 : 1;

  drag(dragRef);
  drop(preview(previewRef));

  return (
    <>
      <CardWrapper ref={previewRef} style={{ opacity }}>
        <HandleWrapper ref={dragRef} />
        <TextWrapper>{text}</TextWrapper>
      </CardWrapper>
      <div style={{ marginBottom: "30px" }}>
        {subs.map((sub, index) => (
          <SubCard
            key={sub.subId}
            id={sub.subId}
            index={index}
            subText={sub.subText}
            moveSub={moveSub}
            findSub={findSub}
            showSubCards={showSubCards}
          />
        ))}
      </div>
    </>
  );
};

export default Card;
