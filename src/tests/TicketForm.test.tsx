import { render, fireEvent } from "@/tests/test-utils";
import TicketForm from "@/components/TicketForm";
import { RootState, setupStore } from "@/redux/store.ts";
import { ITicket } from "@/types";

describe("TicketForm component", () => {
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
    const { getByTestId } = render(<TicketForm ticket={ticket} />, { preloadedState });
    const ticketForm = getByTestId("ticket-form");

    expect(ticketForm).toBeInTheDocument();
    expect(ticketForm).toHaveTextContent("Test Ticket");
  });

  it("updates ticket text on input change", () => {
    const { getByTestId } = render(<TicketForm ticket={ticket} />, { preloadedState });
    const textarea = getByTestId("textarea") as HTMLTextAreaElement;

    fireEvent.change(textarea, { target: { value: "Updated Ticket" } });

    expect(textarea.value).toBe("Updated Ticket");
  });

  it("submits form correctly", () => {
    const store = setupStore(preloadedState);
    const { getByTestId } = render(<TicketForm ticket={ticket} />, { store });

    const textarea = getByTestId("textarea") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Updated Ticket" } });

    const form = getByTestId("ticket-form");
    fireEvent.submit(form);

    const tickets = store.getState().tickets.value;
    expect(tickets[0].text).toBe("Updated Ticket");
  });

  it("cancels form correctly", () => {
    const store = setupStore(preloadedState);
    const { getByText, getByTestId } = render(<TicketForm ticket={ticket} />, { store });

    const textarea = getByTestId("textarea") as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "Updated Ticket" } });

    fireEvent.click(getByText("Cancel"));

    const tickets = store.getState().tickets.value;
    expect(tickets[0].text).toBe("Test Ticket");

    const activeTicket = store.getState().tickets.active;
    expect(activeTicket).toBeNull();
  });
});
