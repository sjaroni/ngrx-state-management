import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup | undefined;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSignup() {
    console.log(this.signupForm?.value);
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
