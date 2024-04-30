import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "@/redux/hooks.ts";
import { save, setActive } from "@/redux/ticketsSlice.ts";
import { ITicket } from "@/types";
import DropMark from "@/components/DropMark.tsx";
import Button from "@/components/UI/Button.tsx";
import Textarea from "@/components/UI/Textarea.tsx";
import { ButtonWrapper, ColoredTicket } from "@/components/styled/Ticket.tsx";

interface Props {
  ticket: ITicket;
}
const TicketForm = ({ ticket }: Props) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(ticket.text);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(save({ ...ticket, text }));
  };

  const handleClose = () => {
    dispatch(setActive(null));
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      const element = textareaRef.current;

      element.focus();
      element.setSelectionRange(element.value.length, element.value.length);
    }
  }, [textareaRef]);

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current?.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [text]);

  return (
    <>
      <DropMark beforeId={ticket.id} column={ticket.column} />
      <ColoredTicket $column={ticket.column}>
        <form onSubmit={handleSubmit}>
          <Textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task description here..."
          />
          <ButtonWrapper>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              <span>Save</span>
            </Button>
          </ButtonWrapper>
        </form>
      </ColoredTicket>
    </>
  );
};

export default TicketForm;
