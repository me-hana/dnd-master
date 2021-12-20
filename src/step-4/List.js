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

  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => c.id === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const showCards = () => {
    console.log("지금 데이터 상태는????", cards);
  };

  return (
    <>
      <button
        onClick={() => {
          console.log("!@#$%", cards);
        }}
      >
        지금 카드 상태
      </button>
      <ListWrapper>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.text}
            subs={card.subs}
            depth={0}
            moveCard={moveCard}
            findCard={findCard}
            showCards={showCards}
          />
        ))}
      </ListWrapper>
    </>
  );
};

export default List;
