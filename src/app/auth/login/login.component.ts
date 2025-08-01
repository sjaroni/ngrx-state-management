import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { AuthService } from '../services/auth.service';
import { User } from '../../models/user.model';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { loginStart } from '../states/auth.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',  
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  loggedInUser: User | undefined;
  // authService = inject(AuthService);
  private store = inject<Store<AppState>>(Store);

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  onLogin() {
    // Mark all controls as touched and update their validity
    // This will trigger validation messages to be displayed
    if (this.loginForm) {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
    }

    if (this.loginForm?.valid) {
      const { email, password } = this.loginForm.value;      
      this.store.dispatch(loginStart({ email, password }));
    }
  }
  validateEmail() {
    const emailControl = this.loginForm?.get('email');
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

  validatePassword() {
    const passwordControl = this.loginForm?.get('password');
    if (passwordControl && passwordControl.touched && !passwordControl.valid) {
      if (passwordControl.errors && passwordControl.errors['required']) {
        return 'Password is required';
      }
    }
    return '';
  }
}
