import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { rootReducer } from "../app/store";
import type { RootState } from "../app/store";

// A partial, per-slice RootState is what configureStore's preloadedState actually
// wants here (each slice either fully supplied or left to its own initialState) --
// RTK 2/redux 5 no longer export a plain `PreloadedState<S>` helper type for this.
type TestPreloadedState = Partial<RootState>;

export function createTestStore(preloadedState?: TestPreloadedState) {
  // Cast needed here specifically: redux's combineReducers happily accepts a state
  // object missing some slice keys at runtime (each falls back to its own reducer's
  // initialState via the standard @@redux/INIT dance), but configureStore's stricter
  // generic inference doesn't see that -- it wants every slice's full state or none.
  return configureStore({ reducer: rootReducer, preloadedState: preloadedState as RootState | undefined });
}

interface RenderOptions {
  preloadedState?: TestPreloadedState;
  route?: string;
  store?: ReturnType<typeof createTestStore>;
}

// Standard RTK-recommended pattern: a fresh store per test (built from the app's real
// reducer map, so slice logic isn't reimplemented here) wrapped in the same Provider +
// Router every real page renders inside, so components under test don't need to know
// they're being tested.
export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = "/", store = createTestStore(preloadedState) }: RenderOptions = {},
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  };
}
