import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { setTickets, setActive } from "@/redux/ticketsSlice.ts";
import DropMark from "@/components/DropMark.tsx";
import { ITicket } from "@/types";
import Button from "@/components/UI/Button.tsx";
import { ColoredTicket, Delete } from "@/components/styled/Ticket.tsx";

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
      <ColoredTicket
        $column={ticket.column}
        draggable={activeTicket === null ? "true" : "false"}
        onDragStart={(e) => handleDragStart(e, ticket)}
        onDoubleClick={handleDoubleClick}
      >
        <Delete>
          <Button onClick={handleDelete} size={0.75}>
            X
          </Button>
        </Delete>
        <p>{ticket.text}</p>
      </ColoredTicket>
    </>
  );
};

export default Ticket;
