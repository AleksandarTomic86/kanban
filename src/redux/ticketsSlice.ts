import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ITicket } from "@/types";

export interface TicketsState {
  value: ITicket[];
  active: ITicket | null;
  dragged: string | null;
  search: string;
}

const initialState: TicketsState = {
  value: [],
  active: null,
  dragged: null,
  search: "",
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<ITicket[]>) => {
      state.value = action.payload;
      state.dragged = null;
    },
    setActive: (state, action: PayloadAction<ITicket | null>) => {
      state.active = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setDragged: (state, action: PayloadAction<string | null>) => {
      state.dragged = action.payload;
    },
    save: (state, action: PayloadAction<ITicket>) => {
      if (!state.value.find((t) => t.id === action.payload.id)) {
        state.value = [...state.value, action.payload];
        state.active = null;
      } else {
        const index = state.value.findIndex((t) => t.id === action.payload.id);
        const copy = [...state.value];
        copy[index] = action.payload;

        state.value = copy;
        state.active = null;
      }
    },
  },
});

interface RootState {
  tickets: TicketsState;
}
// Define input selectors
const selectTickets = (state: RootState) => state.tickets.value;
const selectSearch = (state: RootState) => state.tickets.search;
const selectColumn = (_: RootState, column: string) => column;

// Define the memoized selector
export const selectFilteredTickets = createSelector(
  [selectTickets, selectSearch, selectColumn],
  (tickets, search, column) => tickets.filter((t) => t.column === column && t.text.includes(search))
);

// Action creators are generated for each case reducer function
export const { setTickets, setActive, setSearch, setDragged, save } = ticketsSlice.actions;

export default ticketsSlice.reducer;
