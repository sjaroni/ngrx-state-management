import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

// Du brauchst createFeatureSelector nur einmal pro Feature-Slice – also z. B. für den State mit dem Key "counter" – nicht für jedes einzelne Feld wie toggle oder counter.
// Das 'counter' ist nicht der Name einer Eigenschaft im Interface, sondern der Feature-Key, unter dem dein Reducer im globalen Store registriert wurde.
// Counter kommt vom Provider aus der app.config.ts, wo du den Store mit dem Key 'counter' registriert hast.
export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCounterValue = createSelector(
  selectCounterState,
  (state) => state.counter
);


export const selectToggleValue = createSelector(
  selectCounterState,
  (state) => state.toggle
);