import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AUTH_STATE } from '../../constants';
import { AuthState } from './auth.state';

const authFeatureSelector = createFeatureSelector<AuthState>(AUTH_STATE);

export const getLoggedUser = createSelector(
  authFeatureSelector,
  (state) => state.user
);
