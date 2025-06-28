import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { showForm } from '../states/courses.selector';
import { showCreateForm } from '../states/courses.actions';

@Component({
  selector: 'app-add-course',
  imports: [],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent {
  private store = inject<Store<AppState>>(Store);

  readonly showForm = toSignal(this.store.select(showForm), {
    initialValue: false,
  });

  hideCreateCourse() {
    this.store.dispatch(showCreateForm({ value: false }));
  }
}
