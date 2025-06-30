import { Component, inject } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getCourses, getShowForm } from './states/courses.selector';
import { toSignal } from '@angular/core/rxjs-interop';
import { showForm } from './states/courses.actions';
import { AddCourseComponent } from "./add-course/add-course.component";

@Component({
  selector: 'app-courses',
  imports: [CourseCardComponent, AddCourseComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  private store = inject<Store<AppState>>(Store);
  readonly courses = toSignal(this.store.select(getCourses), {
    initialValue: [],
  });

  readonly showForm = toSignal(this.store.select(getShowForm), {
    initialValue: false,
  });

  showCreateForm() {
    this.store.dispatch(showForm({value: true}));
  }
}
