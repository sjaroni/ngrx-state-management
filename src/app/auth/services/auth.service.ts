import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FIREBASE_API_KEY } from '../../constants';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  login(email: string, password: string) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<User>(url, body);
  }

  getErrorMessage(errorResponse: HttpErrorResponse) {
    let message = 'An unknown error has occured.';

    if (!errorResponse.error || !errorResponse.error.error) {
      return message;
    }
    switch (errorResponse.error.error.message) {
      case 'INVALID_LOGIN_CREDENTIALS':
        message = 'Email or password is incorrect.';
        break;
      case 'EMAIL_NOT_FOUND':
        message = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        message = 'The password is not correct.';
        break;
      case 'USER_DISABLED':
        message = 'The user has been disabled.';
        break;
      default:
        message = errorResponse.error.error.message;
    }
    return message;
  }
}
