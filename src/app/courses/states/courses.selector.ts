import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './courses.state';
import { COURSES_STATE } from '../../constants';

const getCoursesState = createFeatureSelector<CoursesState>(COURSES_STATE);

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

