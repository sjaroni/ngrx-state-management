import { createReducer, on } from '@ngrx/store';
import { initialState } from './courses.state';
import {
  createCourse,
  deleteCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourse,
} from './courses.actions';

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
      ...action.course,
    };
    course.id = state.courses.length + 1; // Assign a new ID based on the current length of the courses array

    return {
      ...state, // extract all properties from the state
      courses: [...state.courses, course],
    };
  }),
  on(setEditMode, (state, action) => {
    return {
      ...state, // extract all properties from the state (counter)
      isEditMode: action.editMode, // toggle the boolean value
    };
  }),
  on(setSelectedCourse, (state, action) => {
    return {
      ...state, // extract all properties from the state (counter)
      selectedCourse: action.course, // toggle the boolean value
    };
  }),
  on(updateCourse, (state, action) => {
    const updateCourses = state.courses.map((c) => {
      if (c.id === action.course.id) {
        return action.course; // Update the course with the new values
      } else {
        return c; // Return the course unchanged if it doesn't match
      }
    });
    return {
      ...state, // extract all properties from the current state
      courses: updateCourses, // update the courses array with the modified courses
    };
  }),
  on(deleteCourse, (state, action) => {
    const filteredCourses = state.courses.filter((c) => c.id !== action.id);
    return {
      ...state, // extract all properties from the current state
      courses: filteredCourses, // update the courses array with the filtered courses
    };
  })
);
