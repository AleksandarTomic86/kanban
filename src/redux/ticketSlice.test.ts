import { ticketsSlice, TicketsState } from "@/redux/ticketsSlice";
import { ITicket } from "@/types";
import { configureStore, EnhancedStore, StoreEnhancer, ThunkDispatch, Tuple, UnknownAction } from "@reduxjs/toolkit";
import { beforeEach } from "vitest";

describe("ticketsSlice", () => {
  let store: EnhancedStore<
    TicketsState,
    UnknownAction,
    Tuple<[StoreEnhancer<{ dispatch: ThunkDispatch<TicketsState, undefined, UnknownAction> }>, StoreEnhancer]>
  >;

  beforeEach(() => {
    store = configureStore({ reducer: ticketsSlice.reducer });
  });

  it("sets tickets correctly", () => {
    const tickets: ITicket[] = [{ id: "1", text: "Test Ticket", column: "todo" }];

    store.dispatch(ticketsSlice.actions.setTickets(tickets));

    const state: TicketsState = store.getState();
    expect(state.value).toEqual(tickets);
    expect(state.dragged).toBeNull();
  });

  it("sets active ticket correctly", () => {
    const ticket: ITicket = { id: "1", text: "Test Ticket", column: "todo" };

    store.dispatch(ticketsSlice.actions.setActive(ticket));

    const state: TicketsState = store.getState();
    expect(state.active).toEqual(ticket);
  });

  it("sets search string correctly", () => {
    const searchString = "Test";

    store.dispatch(ticketsSlice.actions.setSearch(searchString));

    const state: TicketsState = store.getState();
    expect(state.search).toBe(searchString);
  });

  it("sets dragged ticket correctly", () => {
    const ticketId = "1";

    store.dispatch(ticketsSlice.actions.setDragged(ticketId));

    const state: TicketsState = store.getState();
    expect(state.dragged).toBe(ticketId);
  });

  it("saves new ticket correctly", () => {
    const ticket: ITicket = { id: "1", text: "Test Ticket", column: "todo" };

    store.dispatch(ticketsSlice.actions.save(ticket));

    const state: TicketsState = store.getState();
    expect(state.value).toContainEqual(ticket);
    expect(state.active).toBeNull();
  });

  it("updates existing ticket correctly", () => {
    const initialTicket: ITicket = { id: "1", text: "Test Ticket", column: "todo" };
    const updatedTicket: ITicket = { id: "1", text: "Updated Ticket", column: "todo" };

    store.dispatch(ticketsSlice.actions.save(initialTicket));
    store.dispatch(ticketsSlice.actions.save(updatedTicket));

    const state: TicketsState = store.getState();
    expect(state.value).toContainEqual(updatedTicket);
    expect(state.active).toBeNull();
  });
});
