import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;

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
  // Alle Felder als 'touched' markieren, damit Fehler angezeigt werden
  if (this.loginForm) {
    this.loginForm.markAllAsTouched();
    // Optional: Validierung manuell triggern
    this.loginForm.updateValueAndValidity();
  }
  console.log(this.loginForm?.value);  

}
  validateEmail() {
    const emailControl = this.loginForm?.get('email');
    if (emailControl && emailControl.touched && !emailControl.valid) {
      if (emailControl.errors && emailControl.errors['required']) {
        return 'Email is required';
      }
      if( emailControl.errors && emailControl.errors['email']) {
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
