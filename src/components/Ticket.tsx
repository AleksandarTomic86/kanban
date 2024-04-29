import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { setTickets, setActive } from "@/redux/ticketsSlice.ts";
import styles from "@/components/Kanban.module.css";
import DropMark from "@/components/DropMark.tsx";
import { ITicket } from "@/types";

interface Props {
  ticket: ITicket;
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, ticket: ITicket) => void;
}
const Ticket = ({ ticket, handleDragStart }: Props) => {
  const activeTicket = useAppSelector((state) => state.tickets.active);
  const tickets = useAppSelector((state) => state.tickets.value);
  const dispatch = useAppDispatch();
  const handleDoubleClick = () => {
    dispatch(setActive(ticket));
  };

  const handleDelete = () => {
    const filteredTickets = tickets.filter((t) => t.id !== ticket.id);
    dispatch(setTickets(filteredTickets));
  };
  return (
    <>
      <DropMark beforeId={ticket.id} column={ticket.column} />
      <div
        draggable={activeTicket === null ? "true" : "false"}
        onDragStart={(e) => handleDragStart(e, ticket)}
        onDoubleClick={handleDoubleClick}
        className={styles.ticket}
      >
        <div className={styles.ticketDeleteWrapper}>
          <button type={"button"} className={styles.ticketDeleteButton} onClick={handleDelete}>
            x
          </button>
        </div>
        <p>{ticket.text}</p>
      </div>
    </>
  );
};

export default Ticket;
