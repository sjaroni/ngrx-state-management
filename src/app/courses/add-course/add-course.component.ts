import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import { showForm } from '../states/courses.selector';
import { showCreateForm } from '../states/courses.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent implements OnInit {
  ngOnInit() {
    this.courseForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(100),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(5000),
      ]),
      author: new FormControl(null, [Validators.required]),
      price: new FormControl(null),
      image: new FormControl(null),
    });
  }

  courseForm: FormGroup | null = null;

  private store = inject<Store<AppState>>(Store);

  readonly showForm = toSignal(this.store.select(showForm), {
    initialValue: false,
  });

  hideCreateCourse() {
    this.store.dispatch(showCreateForm({ value: false }));
  }

  onCreateCourse() {
    console.log('form submitted', this.courseForm?.value);
  }
}
