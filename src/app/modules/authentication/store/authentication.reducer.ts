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
  on(AuthenticationActions.login, (state, action) => ({
    ...state, // tutaj te ... sie robi po to aby przekopiowac caly state, bez tego przekopiowany zostaloby tylko loading
    loading: true,
  })),
  on(AuthenticationActions.loginSuccess, (state, action) => ({
    ...state,
    loading: false,
    user: new User(action.user.username, action.user.email, action.user.role),
    error: null,
  })),
  on(AuthenticationActions.loginFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthenticationActions.register, (state, action) => ({
    ...state,
    loading: true,
  })),
  on(AuthenticationActions.registerSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(AuthenticationActions.registerFailure, (state, action) => ({
    ...state,
    loading: false,
    error: action.error,
  })),
  on(AuthenticationActions.clearError, (state, action) => ({
    ...state,
    error: null,
  })),
  on(AuthenticationActions.logout, (state, action) => ({
    ...state, // tutaj te ... sie robi po to aby przekopiowac caly state, bez tego przekopiowany zostaloby tylko loading
  })),
  on(AuthenticationActions.logoutSuccess, (state, action) => ({
    ...state,
    user: null,
    error: null,
  })),
  on(AuthenticationActions.logoutFailure, (state, action) => ({
    ...state,
  })),
  on(AuthenticationActions.autoLogin, (state, action) => ({
    ...state, // tutaj te ... sie robi po to aby przekopiowac caly state, bez tego przekopiowany zostaloby tylko loading
  })),
  on(AuthenticationActions.autoLoginSuccess, (state, action) => ({
    ...state,
    user: new User(action.user.username, action.user.email, action.user.role),
  })),
  on(AuthenticationActions.autoLoginFailure, (state, action) => ({
    ...state,
  })),
);

export function authenticationReducer(
  authenticationState: AuthenticationState | undefined,
  action: Action,
) {
  return _authenticationReducer(authenticationState, action);
}
