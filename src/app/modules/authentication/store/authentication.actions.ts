import { createAction, props } from '@ngrx/store';
import {
  UserInterface,
  UserLogin,
  UserRegister,
} from '../../core/models/authentication/authentication.models';

const LOGIN_TYPE = '[Authentication] Login';
const LOGIN_SUCCESS_TYPE = '[Authentication] Login Success';
const LOGIN_FAILURE_TYPE = '[Authentication] Login Failure';

const LOGOUT_TYPE = '[Authentication] Logout';
const LOGOUT_SUCCESS_TYPE = '[Authentication] Logout Success';
const LOGOUT_FAILURE_TYPE = '[Authentication] Logout Failure';

const REGISTER_TYPE = '[Authentication] Register';
const REGISTER_SUCCESS_TYPE = '[Authentication] Register Success';
const REGISTER_FAILURE_TYPE = '[Authentication] Register Failure';

const CLEAR_ERROR_TYPE = '[Authentication] Clear Error';

export const login = createAction(
  LOGIN_TYPE,
  props<{ userLogin: UserLogin }>(),
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS_TYPE,
  props<{ user: UserInterface }>(),
);

export const loginFailure = createAction(
  LOGIN_FAILURE_TYPE,
  props<{ error: string }>(),
);

export const logout = createAction(LOGOUT_TYPE);

export const logoutSuccess = createAction(LOGOUT_SUCCESS_TYPE);

export const logoutFailure = createAction(LOGOUT_FAILURE_TYPE);

export const register = createAction(
  REGISTER_TYPE,
  props<{ userRegister: UserRegister }>(),
);

export const registerSuccess = createAction(REGISTER_SUCCESS_TYPE);

export const registerFailure = createAction(
  REGISTER_FAILURE_TYPE,
  props<{ error: string }>(),
);

export const clearError = createAction(CLEAR_ERROR_TYPE);
