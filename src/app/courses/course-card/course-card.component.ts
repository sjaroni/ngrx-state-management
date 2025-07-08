import { Component, inject, Input } from '@angular/core';
import { Course } from '../../models/course.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { deleteCourse, setEditMode, setSelectedCourse, showForm } from '../states/courses.actions';

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
    this.store.dispatch(setSelectedCourse({ course: this.course! }));
  }
  onCourseDelete() {

    const doDelete = confirm('Are you sure you want to delete this course?');
    if (doDelete) { 
      if (this.course && this.course.id !== undefined) {
        this.store.dispatch(deleteCourse({ id: this.course.id }));
      }
    }
  }
}
