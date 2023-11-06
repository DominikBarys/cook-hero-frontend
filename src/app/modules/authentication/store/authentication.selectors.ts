import { AppState } from '../../../store/app.reducer';
import { createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.reducer';

export const selectAuthentication = (state: AppState) => state.authentication;

export const selectAuthenticationUser = createSelector(
  selectAuthentication,
  (state: AuthenticationState) => state.user,
);

export const selectAuthenticationLoading = createSelector(
  selectAuthentication,
  (state: AuthenticationState) => state.loading,
);

export const selectAuthenticationError = createSelector(
  selectAuthentication,
  (state: AuthenticationState) => state.error,
);
