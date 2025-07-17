import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setIsLoading } from '../../shared/shared.actions';

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
            return loginSuccess({ user: data });
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          this.router.navigate(['/']);
        })
      );
    },
    { dispatch: false }    
  );
}
