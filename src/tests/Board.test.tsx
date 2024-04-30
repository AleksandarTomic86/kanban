import { render, within, fireEvent } from "@/tests/test-utils";
import Board from "@/components/Board";
import { RootState } from "@/redux/store.ts";
import { expect } from "vitest";

describe("Board component", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<Board />);
    expect(getByTestId("board")).toBeInTheDocument();
  });

  it("renders three columns", () => {
    const { getAllByTestId } = render(<Board />);
    const columns = getAllByTestId("column");
    expect(columns).toHaveLength(3);
  });

  it("renders the correct column titles", () => {
    const { getByText } = render(<Board />);
    expect(getByText("To Do")).toBeInTheDocument();
    expect(getByText("In Progress")).toBeInTheDocument();
    expect(getByText("Done")).toBeInTheDocument();
  });

  it("renders empty columns", () => {
    const { getAllByTestId } = render(<Board />);
    const columns = getAllByTestId("column");

    columns.forEach((column) => {
      const { queryAllByTestId } = within(column);
      const tickets = queryAllByTestId("ticket");
      expect(tickets).toHaveLength(0);
    });
  });

  it("renders tickets in columns", () => {
    const preloadedState: RootState = {
      tickets: {
        value: [
          { id: "1", text: "Test Ticket", column: "todo" },
          { id: "2", text: "Test Ticket 2", column: "in_progress" },
          { id: "3", text: "Test Ticket 3", column: "in_progress" },
          { id: "4", text: "Test Ticket 4", column: "done" },
          { id: "5", text: "Test Ticket 5", column: "done" },
          { id: "6", text: "Test Ticket 6", column: "done" },
        ],
        active: null,
        search: "",
        dragged: null,
      },
    };

    const { getAllByTestId } = render(<Board />, { preloadedState });
    const columns = getAllByTestId("column");

    columns.forEach((column) => {
      const { queryAllByTestId } = within(column);
      const tickets = queryAllByTestId("ticket");

      if (column.textContent && column.textContent.includes("To Do")) {
        expect(tickets).toHaveLength(1);
      }

      if (column.textContent && column.textContent.includes("In Progress")) {
        expect(tickets).toHaveLength(2);
      }

      if (column.textContent && column.textContent.includes("Done")) {
        expect(tickets).toHaveLength(3);
      }
    });
  });

  it("allows dragging a ticket from 'To Do' to 'In Progress'", () => {
    const preloadedState: RootState = {
      tickets: {
        value: [{ id: "1", text: "Test Ticket", column: "todo" }],
        active: null,
        search: "",
        dragged: null,
      },
    };

    const { getAllByTestId } = render(<Board />, { preloadedState });
    const columns = getAllByTestId("column");

    const todoColumn = columns.find((column) => (column.textContent as string).includes("To Do"));
    const { getByTestId: getByTestIdToDoColumn } = within(todoColumn as HTMLElement);
    const ticket = getByTestIdToDoColumn("ticket");

    const inProgressColumn = columns.find((column) => (column.textContent as string).includes("In Progress"));
    const { getByTestId: getByTestIdInProgressColumn } = within(inProgressColumn as HTMLElement);
    const dropZone = getByTestIdInProgressColumn("dropzone");

    fireEvent.dragStart(ticket);
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);
    fireEvent.dragEnd(ticket);

    expect(ticket).not.toBeInTheDocument();
    expect(getByTestIdInProgressColumn("ticket")).toBeInTheDocument();
  });
});
