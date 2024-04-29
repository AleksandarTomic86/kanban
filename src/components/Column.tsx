import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { selectFilteredTickets, setActive, setTickets } from "@/redux/ticketsSlice.ts";
import styles from "@/components/Kanban.module.css";
import { IMark, ITicket } from "@/types";
import TicketForm from "@/components/TicketForm.tsx";
import DropMark from "@/components/DropMark.tsx";
import Ticket from "@/components/Ticket.tsx";

interface Props {
  title: string;
  column: string;
}
const Column = ({ title, column }: Props) => {
  const tickets = useAppSelector((state) => state.tickets.value);
  const activeTicket = useAppSelector((state) => state.tickets.active);
  const filteredTickets = useAppSelector((state) => selectFilteredTickets(state, column));
  const isNewTicket = useAppSelector(
    (state) =>
      state.tickets.active !== null &&
      state.tickets.active!.column === column &&
      state.tickets.value.find((t) => t.id === state.tickets.active!.id) === undefined
  );
  const dispatch = useAppDispatch();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ticket: ITicket) => {
    e.dataTransfer.setData("ticketId", ticket.id);
  };

  const addTicket = () => {
    const ticket: ITicket = {
      text: "",
      id: crypto.randomUUID(),
      column,
    };
    dispatch(setActive(ticket));
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const ticketId = e.dataTransfer.getData("ticketId");

    clearHighlights();

    const marks = getMarks();
    const { element } = getNearestMark(e, marks);

    const before = element.dataset.before || "-1";

    if (before !== ticketId) {
      let copy = [...tickets];

      let ticketToTransfer = copy.find((c) => c.id === ticketId);
      if (!ticketToTransfer) return;
      ticketToTransfer = { ...ticketToTransfer, column };

      copy = copy.filter((c) => c.id !== ticketId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(ticketToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, ticketToTransfer);
      }

      dispatch(setTickets(copy));
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

  const getNearestMark = (e: React.DragEvent<HTMLDivElement>, marks: HTMLElement[]): IMark => {
    const OFFSET = 50;

    return marks.reduce(
      (closest: IMark, child) => {
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
    return Array.from(document.querySelectorAll<HTMLElement>(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHeaderWrapper}>
        <div className={styles.columnHeader}>
          <h3>{title}</h3>
          <p>{filteredTickets.length}</p>
        </div>
        <span className={styles.columnAddTicketWrapper} onClick={addTicket}>
          +
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={styles.columnContent}
      >
        {filteredTickets.map((c) => {
          if (activeTicket && activeTicket.id === c.id) {
            return <TicketForm key={c.id} ticket={activeTicket} />;
          }

          return <Ticket key={c.id} ticket={c} handleDragStart={handleDragStart} />;
        })}
        <DropMark beforeId={null} column={column} />
        {isNewTicket && <TicketForm ticket={activeTicket!} />}
      </div>
    </div>
  );
};

export default Column;
