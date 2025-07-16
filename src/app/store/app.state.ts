import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { AUTH_STATE } from '../constants';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  [AUTH_STATE]: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
 [AUTH_STATE]: authReducer
};
