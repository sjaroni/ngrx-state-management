import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import { createCourse, setEditMode, showForm } from './courses.actions';

export const coursesReducer = createReducer(
  initialState,
  on(showForm, (state, action) => {
    return {
      ...state, // extract all properties from the state (counter)
      showForm: action.value, // toggle the boolean value
    };
  }),
  on(createCourse, (state, action) => {
    const course = {
      ...action.course
    }
    course.id = state.courses.length + 1; // Assign a new ID based on the current length of the courses array

    return {
      ...state, // extract all properties from the state
      courses: [...state.courses, course]
    };
  }),
  on(setEditMode, (state, action) => {
    return {
      ...state, // extract all properties from the state (counter)
      isEditMode: action.editMode, // toggle the boolean value
    };
  }),
);
