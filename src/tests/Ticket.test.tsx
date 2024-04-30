import { render, fireEvent } from "@/tests/test-utils";
import Ticket from "@/components/Ticket";
import { RootState, setupStore } from "@/redux/store.ts";
import { ITicket } from "@/types";

describe("Ticket component", () => {
  const ticket: ITicket = { id: "1", text: "Test Ticket", column: "todo" };
  const preloadedState: RootState = {
    tickets: {
      value: [ticket],
      active: null,
      search: "",
      dragged: null,
    },
  };

  it("renders correctly with given ticket", () => {
    const { getByTestId } = render(<Ticket ticket={ticket} handleDragStart={() => {}} />);
    const ticketElement = getByTestId("ticket");

    expect(ticketElement).toBeInTheDocument();
    expect(ticketElement).toHaveTextContent("Test Ticket");
  });

  it("handles drag start correctly", () => {
    const handleDragStart = vi.fn();
    const { getByTestId } = render(<Ticket ticket={ticket} handleDragStart={handleDragStart} />);
    const ticketElement = getByTestId("ticket");

    fireEvent.dragStart(ticketElement);

    expect(handleDragStart).toHaveBeenCalled();
  });

  it("handles double click correctly", () => {
    const store = setupStore(preloadedState);
    const { getByTestId } = render(<Ticket ticket={ticket} handleDragStart={() => {}} />, { store });
    const ticketElement = getByTestId("ticket");

    fireEvent.dblClick(ticketElement);

    const activeTicket = store.getState().tickets.active;
    expect(activeTicket).toEqual(ticket);
  });

  it("handles delete correctly", () => {
    const store = setupStore(preloadedState);
    const { getByText } = render(<Ticket ticket={ticket} handleDragStart={() => {}} />, { store });

    fireEvent.click(getByText("X"));

    const tickets = store.getState().tickets.value;
    expect(tickets).toEqual([]);
  });
});
