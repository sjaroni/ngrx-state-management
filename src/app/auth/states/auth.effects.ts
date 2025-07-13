import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffect {
  // constructor(private actions$: Actions) {}

  private actions$ = inject(Actions);
  authService = inject(AuthService); // Assuming you have an AuthService to handle authentication


  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            // handle the user object here, e.g., return a success action
            return loginSuccess({ user: data })
          })
        );
      })
    )
  })

}
