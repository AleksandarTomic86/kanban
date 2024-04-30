import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "@/redux/store";

import { AppStore, RootState } from "@/redux/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: RootState;
  store?: AppStore;
}

const renderWithProviders = (ui: ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) => {
  const {
    preloadedState = undefined,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return render(ui, {
    wrapper: AllProviders,
    ...renderOptions,
  });
};

export * from "@testing-library/react";
export { renderWithProviders as render };
