import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "@/redux/ticketsSlice";

// Check if there's any saved state in localStorage
const savedStateString = localStorage.getItem("reduxState");

// If there is, parse it and use it as the initial state
const initialState = savedStateString ? JSON.parse(savedStateString) : undefined;

// Create the store with the initial state
const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  preloadedState: initialState ? { tickets: initialState.tickets } : undefined,
});

store.subscribe(() => {
  // Get the current state
  const state = store.getState();

  // Convert the state to a string
  const stateString = JSON.stringify(state);

  // Save the state string to localStorage
  localStorage.setItem("reduxState", stateString);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
