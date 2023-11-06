export interface UserInterface {
  username: string;
  email: string;
  role: string;
}

export class User implements UserInterface {
  //TODO add missing attributes to user
  constructor(
    public username: string,
    public email: string,
    public role: string,
  ) {}
}

export interface UserLogin {
  login: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  email: string;
}

export interface AuthenticationResponse {
  timestamp: string;
  message: string;
  code: string;
}

export interface PasswordRecovery {
  email: string;
}

export interface PasswordReset {
  password: string;
  uuid: string;
}
