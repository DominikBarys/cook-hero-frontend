import { AuthenticationState } from '../modules/authentication/store/authentication.reducer';

export interface AppState {
  authentication: AuthenticationState;
}
