import { createReducer, on } from "@ngrx/store";
import { initialState } from "./counter.state";
import { decrement, increment, reset } from "./counter.actions";

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state, // extract all properties from the state (counter)
      counter: state.counter + 1 // increment the counter by 1
    }
  }),
  on(decrement, (state) => {
    return {
      ...state, // extract all properties from the state (counter)
      counter: state.counter - 1 // decrement the counter by 1
    }
  }),
  on(reset, (state) => {
    return {
      ...state, // extract all properties from the state (counter)
      counter: 0 // reset the counter to 0
    }
  }),
)