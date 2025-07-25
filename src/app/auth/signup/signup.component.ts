import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { signupStart } from '../states/auth.actions';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | undefined;
  private store = inject<Store<AppState>>(Store);

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignup() {
    const { email, password} = this.signupForm?.value;
    this.store.dispatch(signupStart({email, password}));
    
    if (this.signupForm) {
      this.signupForm.markAllAsTouched();
      this.signupForm.updateValueAndValidity();
    }
    if (this.signupForm?.invalid) {
      console.log('Das klappt so nicht');
    }
    if (this.signupForm?.valid) {
      console.log('Weitere Steps hier');
    }
  }

  validatePassword() {
    const passwordControl = this.signupForm?.get('password');
    if (passwordControl && passwordControl.touched && !passwordControl.valid) {
      if (passwordControl.errors && passwordControl.errors['required']) {
        return 'Password is required';
      }
    }
    return '';
  }

  validateEmail() {
    const emailControl = this.signupForm?.get('email');
    if (emailControl && emailControl.touched && !emailControl.valid) {
      if (emailControl.errors && emailControl.errors['required']) {
        return 'Email is required';
      }
      if (emailControl.errors && emailControl.errors['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }
}
