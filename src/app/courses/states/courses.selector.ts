import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';

const getCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourses = createSelector(
  getCoursesState,
  (state) => state.courses
);

export const getShowForm = createSelector(
  getCoursesState,
  (state) => state.showForm
);

export const getEditMode = createSelector(
  getCoursesState,
  (state) => state.isEditMode
);

export const getSelectedCourse = createSelector(
  getCoursesState,
  (state) => state.selectedCourse
);

