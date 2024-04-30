import Board from "@/components/Board.tsx";
import { useAppDispatch, useAppSelector } from "@/redux/hooks.ts";
import { setSearch } from "@/redux/ticketsSlice.ts";
import React from "react";
import Box from "@/components/UI/Box.tsx";
import { Input, StyledKanban } from "@/components/styled/Kanban.tsx";

interface Props {
  className?: string;
}
const Kanban = ({ className }: Props) => {
  const search = useAppSelector((state) => state.tickets.search);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };
  return (
    <StyledKanban className={className}>
      <Box $direction={"column"} $justify={"center"} $items={"center"} $mx={"auto"} $width={"43rem"}>
        <Box $justify={"flex-end"} $items={"center"} $my={"1rem"} $width={"100%"}>
          <Input type="text" value={search} onChange={handleChange} placeholder={"search..."} />
        </Box>
        <Board />
      </Box>
    </StyledKanban>
  );
};

export default Kanban;
