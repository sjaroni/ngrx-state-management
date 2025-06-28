import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { showHTMLForm } from './courses.actions';

export const coursesReducer = createReducer(
  initialState,
  on(showHTMLForm, (state) => {
    return {
      ...state, // extract all properties from the state (counter)
      showForm: !state.showForm, // toggle the boolean value
    };
  })
);
