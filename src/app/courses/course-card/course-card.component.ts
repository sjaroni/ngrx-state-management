import { Component, inject, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setEditMode, showForm } from '../states/courses.actions';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss',
})
export class CourseCardComponent {
  @Input() course: Course | null = null;

  private store = inject<Store<AppState>>(Store);

  onCourseEdit() {
    this.store.dispatch(setEditMode({ editMode: true }));
    this.store.dispatch(showForm({ value: true }));
  }
}
