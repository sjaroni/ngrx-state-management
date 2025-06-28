import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { showCreateForm } from './courses.actions';

export const coursesReducer = createReducer(
  initialState,
  on(showCreateForm, (state, action) => {
    return {
      ...state, // extract all properties from the state (counter)
      showForm: action.value, // toggle the boolean value
    };
  })
);
