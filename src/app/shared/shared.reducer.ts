import { createReducer, on } from "@ngrx/store";
import { initialState } from "./shared.state";
import { setIsLoading } from "./shared.actions";

export const sharedReducer = createReducer(
  initialState,
  on(setIsLoading, (state, action) => {
    return {
      ...state,
      isLoading: action.value
    }
  })
)