import { useState, useCallback, useEffect } from "react";
import { styled } from "@mui/material/styles";
import update from "immutability-helper";
import { SampleData } from "./Data";
import Card from "./Card";

const ListWrapper = styled("div")(() => ({
  width: 400,
}));

const List = () => {
  const [cards, setCards] = useState([]);
  const [indexes, setIndexes] = useState({
    myIndex: null,
    atIndex: null,
  });

  useEffect(() => {
    let _data = SampleData;
    let _sortedData = [];
    let _curr = {};

    for (let i = 0; i < _data.length; i++) {
      if (_data[i].nextLid === null) {
        _curr = _data[i];
        _sortedData.push(_data[i]);
        break;
      }
    }

    while (_data.length !== _sortedData.length) {
      for (let i = 0; i < _data.length; i++) {
        if (_curr.lid === _data[i].nextLid) {
          _curr = _data[i];
          _sortedData.push(_data[i]);
          continue;
        }
      }
    }

    setCards(_sortedData.reverse());
  }, []);

  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => c.lid === id)[0];
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
      console.log("카드 인덱스", index, atIndex);
      setIndexes({
        myIndex: index,
        atIndex: atIndex,
      });
    },
    [findCard, cards, setCards]
  );

  const printPreNext = () => {
    console.log(
      "내 위의 Pre 인덱스★★★★",
      indexes.atIndex - 1,
      cards[indexes.atIndex - 1]
    );
    console.log(
      "내가 도착한 인덱스★★★★★",
      indexes.atIndex,
      cards[indexes.atIndex]
    );
    console.log(
      "Next 인덱스★★★★★★★",
      indexes.atIndex + 1,
      cards[indexes.atIndex + 1]
    );
  };

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
            key={card.lid}
            index={i}
            lid={card.lid}
            val={card.val}
            moveCard={moveCard}
            findCard={findCard}
            showCards={showCards}
            printPreNext={printPreNext}
          />
        ))}
      </ListWrapper>
    </>
  );
};

export default List;
