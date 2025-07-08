import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  getEditMode,
  getSelectedCourse,
  getShowForm,
} from '../states/courses.selector';
import {
  createCourse,
  setEditMode,
  setSelectedCourse,
  showForm,
  updateCourse,
} from '../states/courses.actions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
})
export class AddCourseComponent implements OnInit {
  ngOnInit() {
    this.init();
    this.selectedCourse();
  }

  init() {
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

  selectedCourse() {
    const courseValue = this.course();
    const editMode = this.editMode();

    if (editMode && courseValue) {
      this.courseForm?.patchValue(courseValue);
    }
  }

  courseForm: FormGroup | null = null;

  private store = inject<Store<AppState>>(Store);

  readonly showForm = toSignal(this.store.select(getShowForm), {
    initialValue: false,
  });

  readonly editMode = toSignal(this.store.select(getEditMode), {
    initialValue: false,
  });

  readonly course = toSignal(this.store.select(getSelectedCourse), {
    initialValue: null,
  });

  hideCreateCourse() {
    this.store.dispatch(showForm({ value: false }));
    this.store.dispatch(setEditMode({ editMode: false }));
  }

  onCreateOrEditCourse() {
    if (!this.courseForm?.valid) {
      console.error('Form is invalid');
      return;
    }

    if (this.editMode()) {
      const updatedCourse: Course = {
        id: this.course()?.id,
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        author: this.courseForm.value.author,
        price: +this.courseForm.value.price,
        image: this.courseForm.value.image
      };      
      this.store.dispatch(updateCourse({ course: updatedCourse }));
    } else {
      this.store.dispatch(createCourse({ course: this.courseForm.value }));
    }

    this.store.dispatch(showForm({ value: false }));
    this.store.dispatch(setEditMode({ editMode: false }));
    this.store.dispatch(setSelectedCourse({ course: { id: 0, title: '', description: '', author: '', price: 0, image: '' } }));
  }

  showTitleValidationError() {
    const titleControl = this.courseForm?.get('title');
    if (titleControl && titleControl.touched && !titleControl.valid) {
      if (titleControl.errors && titleControl.errors['required']) {
        return 'Title is required';
      }
      if (
        (titleControl.errors && titleControl.errors['minlength']) ||
        (titleControl.errors && titleControl.errors['maxlength'])
      ) {
        return `Title must be at least between 6 to 100 characters long`;
      }
      // Add additional error checks here if needed
    }
    return '';
  }

  showDescriptionValidationError() {
    const descriptionControl = this.courseForm?.get('description');
    if (
      descriptionControl &&
      descriptionControl.touched &&
      !descriptionControl.valid
    ) {
      if (descriptionControl.errors && descriptionControl.errors['required']) {
        return 'Description is required';
      }
      if (
        (descriptionControl.errors && descriptionControl.errors['minlength']) ||
        (descriptionControl.errors && descriptionControl.errors['maxlength'])
      ) {
        return `Description must be at least between 10 to 5000 characters long`;
      }
      // Add additional error checks here if needed
    }
    return '';
  }

  showAuthorValidationError() {
    const authorControl = this.courseForm?.get('author');
    if (authorControl && authorControl.touched && !authorControl.valid) {
      if (authorControl.errors && authorControl.errors['required']) {
        return 'Author is required';
      }
    }
    return '';
  }
}
