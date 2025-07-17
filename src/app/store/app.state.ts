import { authReducer } from '../auth/states/auth.reducer';
import { AuthState } from '../auth/states/auth.state';
import { AUTH_STATE, SHARED_STATE } from '../constants';
import { ActionReducerMap } from '@ngrx/store';
import { SharedState } from '../shared/shared.state';
import { sharedReducer } from '../shared/shared.reducer';

export interface AppState {
  [AUTH_STATE]: AuthState,
  [SHARED_STATE]: SharedState  
}

export const appReducer: ActionReducerMap<AppState> = {
 [AUTH_STATE]: authReducer,
 [SHARED_STATE]: sharedReducer
};
