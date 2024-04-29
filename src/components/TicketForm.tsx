import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks.ts";
import { save, setActive } from "@/redux/ticketsSlice.ts";
import { ITicket } from "@/types";

interface Props {
  ticket: ITicket;
}
const TicketForm = ({ ticket }: Props) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(ticket.text);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(save({ ...ticket, text }));
  };

  const handleClose = () => {
    dispatch(setActive(null));
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

export default TicketForm;
