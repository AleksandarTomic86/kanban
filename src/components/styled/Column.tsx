import styled, { css } from "styled-components";
import Box from "@/components/UI/Box.tsx";
import { ColumnType } from "@/types";

export const Wrapper = styled.div`
  width: 14rem;
  flex-shrink: 0;
  color: white;
`;

export const HeaderWrapper = styled(Box)`
  margin-bottom: 0.5rem;

  position: relative;
  justify-content: space-between;
`;

const Header = styled(Box)`
  padding-top: 1rem;
  flex-direction: column;
  height: 3rem;
  width: 100%;
  text-align: center;
  justify-content: flex-end;
  & p {
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
  }
`;
export const ColoredHeader = styled(Header)<{ $column?: ColumnType }>`
  ${(props) => {
    switch (props.$column) {
      case "todo":
        return css`
          background: #159ce1;
        `;
      case "in_progress":
        return css`
          background: #e82763;
        `;
      default:
        return css`
          background: #0e2a4a;
        `;
    }
  }};
`;
export const AddTicketWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const Content = styled(Box)`
  flex-direction: column;
  justify-content: flex-start;
  min-height: 4rem;
  padding: 0.5rem 3rem;
  align-items: normal;
  height: 92%;
  max-height: 80vh;
  overflow: auto;
`;

export const ColoredContent = styled(Content)<{ $column?: ColumnType }>`
  ${(props) => {
    switch (props.$column) {
      case "todo":
        return css`
          background: #c5e7f8;
        `;
      case "in_progress":
        return css`
          background: #f7c9ca;
        `;
      default:
        return css`
          background: #c3cad2;
        `;
    }
  }};
`;
