export interface UserInterface {
  username: string;
  password: string;
  email: string;
}

export class User implements UserInterface {
  //TODO add missing attributes to user
  constructor(
    public username: string,
    public email: string,
    public password: string,
  ) {}
}

export interface UserLogin {
  login: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  email: string;
}
