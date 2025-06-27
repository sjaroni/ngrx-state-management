import { Course } from "../../models/course.model";

export interface CoursesState {
  courses: Course[];
}

export const initialState: CoursesState = {
  courses: [],
}