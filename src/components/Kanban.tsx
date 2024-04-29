import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./Kanban.module.css";

export const CustomKanban = () => {
  return (
    <div className={styles.canban}>
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  return (
    <div className={styles.board}>
      <Column
        title="TO DO"
        column="todo"
        cards={cards}
        setCards={setCards}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Column
        title="In progress"
        column="in_progress"
        cards={cards}
        setCards={setCards}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
      <Column
        title="Done"
        column="done"
        cards={cards}
        setCards={setCards}
        activeCard={activeCard}
        setActiveCard={setActiveCard}
      />
    </div>
  );
};
interface Card {
  text: string;
  id: string;
  column: string;
}

interface Mark {
  offset: number;
  element: HTMLElement;
}
interface ColumnProps {
  title: string;
  cards: Card[];
  column: string;
  setCards: Dispatch<SetStateAction<Card[]>>;
  activeCard: Card | null;
  setActiveCard: Dispatch<SetStateAction<Card | null>>;
}
const Column = ({
  title,
  cards,
  column,
  setCards,
  activeCard,
  setActiveCard,
}: ColumnProps) => {
  const [newCard, setNewCard] = useState<Card | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const addCard = () => {
    const card: Card = {
      text: "",
      id: crypto.randomUUID(),
      column,
    };
    setNewCard(card);
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");

    clearHighlights();

    const marks = getMarks();
    const { element } = getNearestMark(e, marks);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightMark(e);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const marks = els || getMarks();

    marks.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightMark = (e: React.DragEvent<HTMLDivElement>) => {
    const marks = getMarks();

    clearHighlights(marks);

    const el = getNearestMark(e, marks);

    el.element.style.opacity = "1";
  };

  const getNearestMark = (
    e: React.DragEvent<HTMLDivElement>,
    marks: HTMLElement[]
  ): Mark => {
    const OFFSET = 50;

    return marks.reduce(
      (closest: Mark, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: marks[marks.length - 1],
      }
    );
  };

  const getMarks = () => {
    return Array.from(
      document.querySelectorAll<HTMLElement>(`[data-column="${column}"]`)
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className={styles.column}>
      <div className={styles.columnHeaderWrapper}>
        <div className={styles.columnHeader}>
          <h3>{title}</h3>
          <p>{filteredCards.length}</p>
        </div>
        <span className={styles.columnAddCardWrapper} onClick={addCard}>
          +
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={styles.columnContent}
      >
        {filteredCards.map((c) => {
          if (activeCard && activeCard.id === c.id) {
            return (
              <CardForm
                cards={cards}
                key={c.id}
                activeCard={activeCard}
                setCards={setCards}
                setActiveCard={setActiveCard}
              />
            );
          }

          return (
            <Card
              key={c.id}
              setCards={setCards}
              card={c}
              handleDragStart={handleDragStart}
              activeCard={activeCard}
              setActiveCard={setActiveCard}
            />
          );
        })}
        <DropMark beforeId={null} column={column} />
        {newCard && (
          <CardForm
            cards={cards}
            setCards={setCards}
            activeCard={newCard}
            setActiveCard={setNewCard}
          ></CardForm>
        )}
      </div>
    </div>
  );
};

interface CardProps {
  card: Card;
  setCards: Dispatch<SetStateAction<Card[]>>;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, card: Card) => void;
  activeCard: Card | null;
  setActiveCard: Dispatch<SetStateAction<Card | null>>;
}
// rename to ticket
const Card = ({
  card,
  setCards,
  handleDragStart,
  activeCard,
  setActiveCard,
}: CardProps) => {
  const handleDoubleClick = () => {
    setActiveCard(card);
  };

  const handleDelete = () => {
    setCards((pv) => pv.filter((c) => c.id !== card.id));
  };
  return (
    <>
      <DropMark beforeId={card.id} column={card.column} />
      <div
        draggable={activeCard === null ? "true" : "false"}
        onDragStart={(e) => handleDragStart(e, card)}
        onDoubleClick={handleDoubleClick}
        className={styles.card}
      >
        <div className={styles.cardDeleteWrapper}>
          <button
            type={"button"}
            className={styles.cardDeleteButton}
            onClick={handleDelete}
          >
            x
          </button>
        </div>
        <p>{card.text}</p>
      </div>
    </>
  );
};

interface DropMarkProps {
  beforeId: string | null;
  column: string;
}
const DropMark = ({ beforeId, column }: DropMarkProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className={styles.dropMark}
    />
  );
};

interface CardFormProps {
  cards: Card[];
  setCards: Dispatch<SetStateAction<Card[]>>;
  activeCard: Card;
  setActiveCard: Dispatch<SetStateAction<Card | null>>;
}
const CardForm = ({
  cards,
  setCards,
  activeCard,
  setActiveCard,
}: CardFormProps) => {
  const [text, setText] = useState(activeCard.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!cards.find((el) => el.id === activeCard.id)) {
      setCards([...cards, { ...activeCard, text }]);
      setActiveCard(null);
    } else {
      setCards((pv) => {
        const index = pv.findIndex((el) => el.id === activeCard.id);
        const copy = [...pv];
        copy[index] = { ...copy[index], text: text.trim() };
        return copy;
      });
      setActiveCard(null);
    }
  };

  const handleClose = () => {
    setActiveCard(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        defaultValue={text}
        onChange={(e) => setText(e.target.value)}
        autoFocus
        placeholder="Task description here..."
      />
      <div className="mt-1.5 flex items-center justify-end gap-1.5">
        <button onClick={handleClose}>x</button>
        <button type="submit">
          <span>Save</span>
        </button>
      </div>
    </form>
  );
};
