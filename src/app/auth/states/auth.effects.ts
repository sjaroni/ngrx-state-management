import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  loginStart,
  loginSuccess,
  logout,
  signupStart,
  signupSuccess,
} from './auth.actions';
import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setErrorMessage, setIsLoading } from '../../shared/shared.actions';
import { of } from 'rxjs';

@Injectable()
export class AuthEffect {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject<Store<AppState>>(Store);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const loggedUser = this.authService.formatUserData(data);
            this.authService.saveUserInLocalStorage(loggedUser);
            return loginSuccess({ user: loggedUser });
          }),
          catchError((errorResponse) => {
            // console.log(errorResponse);
            this.store.dispatch(setIsLoading({ value: false }));
            const errorMessage =
              this.authService.getErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        this.store.dispatch(setIsLoading({ value: true }));
        return this.authService.signup(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setIsLoading({ value: false }));
            const signedUser = this.authService.formatUserData(data);
            this.authService.saveUserInLocalStorage(signedUser);
            return signupSuccess({ user: signedUser });
          }),
          catchError((errorResponse) => {
            //   console.log(errorResponse);
            this.store.dispatch(setIsLoading({ value: false }));
            const errorMessage =
              this.authService.getErrorMessage(errorResponse);
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  // wird aufgerufen wenn login$ oder signup$ erfolgreich ist (durch loginSuccess oder signupSuccess)
  redirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.readUserFromLocalStorage();
        if (user) {
          return of(loginSuccess({ user }));
        } else {
          return of(
            setErrorMessage({ message: 'No user found in local storage.' })
          );
        }
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.authService.removeUserFromLocalStorage();
          this.router.navigate(['auth', 'login']);
        })
      );
    },
    { dispatch: false }
  );
}
