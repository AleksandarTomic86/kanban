import Column, { Props } from "@/components/Column.tsx";
import { render, fireEvent } from "@/tests/test-utils";
import { RootState } from "@/redux/store.ts";
import { expect } from "vitest";

describe("Column Component", () => {
  const mockColumnProps: Props = {
    title: "To Do",
    column: "todo",
  };
  const preloadedState: RootState = {
    tickets: {
      value: [{ id: "1", text: "Test Ticket", column: "todo" }],
      active: null,
      search: "",
      dragged: null,
    },
  };

  it("renders column with correct title", () => {
    const { getByText } = render(<Column {...mockColumnProps} />);

    expect(getByText("To Do")).toBeInTheDocument();
  });

  it("adds a new ticket when add button is clicked", async () => {
    const { getByText, findByTestId } = render(<Column {...mockColumnProps} />);

    fireEvent.click(getByText("+"));
    const ticketForm = await findByTestId("ticket-form");

    expect(ticketForm).toBeInTheDocument();
  });

  it("renders correct number of tickets", () => {
    const { getByText } = render(<Column {...mockColumnProps} />, {
      preloadedState,
    });

    const numberOfTickets = getByText("(1)");
    expect(numberOfTickets).toBeDefined();
  });

  it("handles drag and drop correctly", async () => {
    const { findByTestId, getByText, getAllByTestId } = render(<Column {...mockColumnProps} />, {
      preloadedState,
    });

    const tickets = getAllByTestId("ticket");
    expect(tickets).toHaveLength(1);

    const ticket = getByText("Test Ticket");

    const dropZone = await findByTestId("dropzone");

    fireEvent.dragStart(ticket);
    fireEvent.dragOver(dropZone);
    fireEvent.drop(dropZone);

    expect(dropZone).toContainElement(ticket);
  });

  it("handles drag events correctly", async () => {
    const { findByTestId, getByText } = render(<Column {...mockColumnProps} />, {
      preloadedState,
    });

    const ticket = getByText("Test Ticket");
    const dropZone = await findByTestId("dropzone");

    const marks = document.querySelectorAll("[data-column='todo']") as NodeListOf<HTMLElement>;
    const visibleMark = () => {
      let visible = false;
      marks.forEach((mark) => {
        if (mark.style.opacity === "1") {
          visible = true;
          return;
        }
      });
      return visible;
    };

    expect(visibleMark()).toBeFalsy();

    fireEvent.dragStart(ticket);
    fireEvent.dragOver(dropZone);
    expect(visibleMark()).toBeTruthy();

    fireEvent.dragLeave(dropZone);
    expect(visibleMark()).toBeFalsy();

    fireEvent.dragOver(dropZone);
    expect(visibleMark()).toBeTruthy();

    fireEvent.drop(dropZone);
    expect(visibleMark()).toBeFalsy();
  });
});
