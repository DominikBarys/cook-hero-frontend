import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  AuthenticationResponse,
  PasswordRecovery,
  PasswordReset,
  UserInterface,
  UserLogin,
  UserRegister,
} from '../models/authentication/authentication.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl = `${environment.apiUrl}/auth`;

  constructor(private httpClient: HttpClient) {}

  login(body: UserLogin): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${this.apiUrl}/login`, body);
  }

  logout(): Observable<AuthenticationResponse> {
    return this.httpClient.get<AuthenticationResponse>(`${this.apiUrl}/logout`);
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
}
