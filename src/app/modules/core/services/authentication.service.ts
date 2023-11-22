import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AuthenticationResponse,
  PasswordRecovery,
  PasswordReset,
  User,
  UserInterface,
  UserLoggedInResponse,
  UserLogin,
  UserRegister,
} from '../models/authentication/authentication.models';
import { Observable } from 'rxjs';
import { Response } from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}

  login(body: UserLogin): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${this.apiUrl}/login`, body, {
      withCredentials: true,
    });
  }

  getUser(): Observable<UserInterface> {
    const siema = this.httpClient.get<UserInterface>(
      `${this.apiUrl}/get-user`,
      {
        withCredentials: true,
      },
    );
    console.log('getuser');
    console.log(
      siema.subscribe({
        next: (user) => {
          console.log(user.uuid);
        },
      }),
    );
    return siema;
  }

  getAllUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(`${this.apiUrl}/all`, {
      withCredentials: true,
    });
  }

  logout(): Observable<AuthenticationResponse> {
    return this.httpClient.get<AuthenticationResponse>(
      `${this.apiUrl}/logout`,
      {
        withCredentials: true,
      },
    );
  }

  register(body: UserRegister): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      `${this.apiUrl}/register`,
      body,
    );
  }

  activateAccount(uuid: string): Observable<AuthenticationResponse> {
    const httpParams = new HttpParams().append('uuid', uuid);

    return this.httpClient.get<AuthenticationResponse>(
      `${this.apiUrl}/activate`,
      {
        params: httpParams,
      },
    );
  }

  passwordRecovery(body: PasswordRecovery): Observable<AuthenticationResponse> {
    return this.httpClient.post<AuthenticationResponse>(
      `${this.apiUrl}/reset-password`,
      body,
    );
  }

  passwordReset(body: PasswordReset): Observable<AuthenticationResponse> {
    return this.httpClient.patch<AuthenticationResponse>(
      `${this.apiUrl}/reset-password`,
      body,
    );
  }

  passwordResetNoEmail(
    newPassword: string,
  ): Observable<AuthenticationResponse> {
    return this.httpClient.patch<AuthenticationResponse>(
      `${this.apiUrl}/reset-password-no-email`,
      newPassword,
      { withCredentials: true },
    );
  }

  changeUsername(newUsername: string): Observable<AuthenticationResponse> {
    return this.httpClient.patch<AuthenticationResponse>(
      `${this.apiUrl}/change-username?newUsername=` + newUsername,
      {},
      { withCredentials: true },
    );
  }

  isUserLoggedIn(): Observable<UserLoggedInResponse> {
    return this.httpClient.get<UserLoggedInResponse>(
      `${this.apiUrl}/logged-in`,
      {
        withCredentials: true,
      },
    );
  }

  autoLogin(): Observable<UserInterface> {
    return this.httpClient.get<UserInterface>(`${this.apiUrl}/auto-login`, {
      withCredentials: true,
    });
  }

  changeUserRole(
    uuid: string,
    role: string,
  ): Observable<AuthenticationResponse> {
    const params = new HttpParams().append('uuid', uuid).append('role', role);
    return this.httpClient.patch<AuthenticationResponse>(
      `${this.apiUrl}/change-role`,
      {},
      {
        params,
        withCredentials: true,
      },
    );
  }

  deleteUser(uuid: string): Observable<AuthenticationResponse> {
    const params = new HttpParams().append('uuid', uuid);
    return this.httpClient.delete<AuthenticationResponse>(
      `${this.apiUrl}/delete`,
      {
        params,
        withCredentials: true,
      },
    );
  }
}
