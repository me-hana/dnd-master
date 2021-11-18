import { useState, useCallback } from "react";
import { styled } from "@mui/material/styles";
import update from "immutability-helper";
import { SampleData } from "./Data";
import Card from "./Card";

const ListWrapper = styled("div")(() => ({
  width: 400,
}));

const List = () => {
  const [cards, setCards] = useState(SampleData);
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = cards[dragIndex];
      setCards(
        update(cards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [cards]
  );

  const showCards = () => {
    console.log("지금 데이터 상태는????", cards);
  };

  return (
    <ListWrapper>
      {cards.map((card, i) => (
        <Card
          key={card.id}
          index={i}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
          showCards={showCards}
        />
      ))}
    </ListWrapper>
  );
};

export default List;
