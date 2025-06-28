import { Component, inject } from '@angular/core';
import { CourseCardComponent } from './course-card/course-card.component';
import { Course } from '../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.state';
import { getCourses } from './states/courses.selector';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-courses',
  imports: [CourseCardComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  private store = inject<Store<AppState>>(Store);
  readonly courses = toSignal(this.store.select(getCourses), {
    initialValue: [],
  });
}
