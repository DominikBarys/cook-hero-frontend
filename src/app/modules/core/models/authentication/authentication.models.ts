export interface UserInterface {
  uuid: string;
  username: string;
  email: string;
  role: string;
  rank: string;
  joinedAt: string;
  amountOfCreatedTutorials: number;
}

export class User implements UserInterface {
  constructor(
    public uuid: string,
    public username: string,
    public email: string,
    public role: string,
    public rank: string,
    public joinedAt: string,
    public amountOfCreatedTutorials: number,
  ) {}
}

export interface UserLogin {
  username: string;
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

export interface UserLoggedInResponse
  extends Omit<AuthenticationResponse, 'message'> {
  loggedIn: boolean;
}

export interface PasswordRecovery {
  email: string;
}

export interface PasswordReset {
  password: string;
  uuid: string;
}
