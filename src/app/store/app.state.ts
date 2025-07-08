// import { counterReducer } from '../counter/states/counter.reducer';
import { CounterState } from '../counter/states/counter.state';
// import { coursesReducer } from '../courses/states/courses.reducer';
import { CoursesState } from '../courses/states/courses.state';
// import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  counter: CounterState;
  courses: CoursesState;
}

// export const appReducer: ActionReducerMap<AppState> = {
//   counter: counterReducer,
//   courses: coursesReducer,
// };
