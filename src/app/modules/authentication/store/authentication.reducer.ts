import {
  User,
  UserInterface,
} from '../../core/models/authentication/authentication.models';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthenticationActions from './authentication.actions';

export interface AuthenticationState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthenticationState = {
  user: null,
  loading: false,
  error: null,
};

const _authenticationReducer = createReducer(
  initialState,
  on(AuthenticationActions.login, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthenticationActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: new User(
      action.user.uuid,
      action.user.username,
      action.user.email,
      action.user.role,
      action.user.rank,
      action.user.joinedAt,
      action.user.amountOfCreatedTutorials,
    ),
    error: null,
  })),
  on(AuthenticationActions.loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthenticationActions.register, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthenticationActions.registerSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthenticationActions.registerFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthenticationActions.clearError, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthenticationActions.logout, (state) => ({
    ...state,
  })),
  on(AuthenticationActions.logoutSuccess, (state) => ({
    ...state,
    user: null,
    error: null,
  })),
  on(AuthenticationActions.logoutFailure, (state) => ({
    ...state,
  })),
  on(AuthenticationActions.autoLogin, (state) => ({
    ...state,
  })),
  on(AuthenticationActions.autoLoginSuccess, (state, action) => ({
    ...state,
    user: new User(
      action.user.uuid,
      action.user.username,
      action.user.email,
      action.user.role,
      action.user.rank,
      action.user.joinedAt,
      action.user.amountOfCreatedTutorials,
    ),
  })),
  on(AuthenticationActions.autoLoginFailure, (state) => ({
    ...state,
  })),
);

export function authenticationReducer(
  authenticationState: AuthenticationState | undefined,
  action: Action,
) {
  return _authenticationReducer(authenticationState, action);
}
