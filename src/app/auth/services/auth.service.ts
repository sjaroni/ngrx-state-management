import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FIREBASE_API_KEY } from '../../constants';
import { AuthResponse } from '../../models/auth-response.model';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  http = inject(HttpClient);

  login(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(url, body);
  }

  signup(email: string, password: string): Observable<AuthResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`;
    const body = {
      email,
      password,
      returnSecureToken: true,
    };
    return this.http.post<AuthResponse>(url, body);
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
      case 'EMAIL_EXISTS':
        message = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        message = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        message =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      default:
        message = errorResponse.error.error.message;
    }
    return message;
  }

  formatUserData(response: AuthResponse) {
    const expirationTimestamp = Date.now() + +response.expiresIn * 1000;
    const formattedUser: User = {
      accessToken: response.idToken,
      email: response.email,
      expiresAt: expirationTimestamp,
      userId: response.localId,
    };
    return formattedUser;
  }

  saveUserInLocalStorage(user: User) {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.log('Error saving user in local storage:', error);
    }
  }
}
