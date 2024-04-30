import styled, { css } from "styled-components";
import { ColumnType } from "@/types";

const StyledTicket = styled.div`
  box-shadow: 0.25rem 0.25rem rgba(0, 0, 0, 0.08);
  cursor: grab;
  padding: 0.5rem;
  text-align: center;
  font-size: 1.25rem;
  word-wrap: break-word;
  &:active {
    cursor: grabbing;
  }
`;

export const ColoredTicket = styled(StyledTicket)<{ $column: ColumnType }>`
  ${(props) => {
    switch (props.$column) {
      case "todo":
        return css`
          background: #5eb9ea;
        `;
      case "in_progress":
        return css`
          background: #ed7583;
        `;
      default:
        return css`
          background: #556a80;
        `;
    }
  }};
`;

export const Delete = styled.div`
  display: none;
  margin-bottom: 0.25rem;
  ${ColoredTicket}:hover & {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
