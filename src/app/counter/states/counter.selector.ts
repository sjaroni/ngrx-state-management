import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CounterState } from "./counter.state";

export const selectCounterState = createFeatureSelector<CounterState>('counter');

export const selectCounterValue = createSelector(
  selectCounterState,
  (state) => state.counter
);