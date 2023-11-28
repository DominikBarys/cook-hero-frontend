import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, EMPTY, Observable, tap } from 'rxjs';
import {
  ChangeUserIngredient,
  Response,
  UserIngredient,
} from '../models/tutorial/tutorial.models';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../authentication/store/authentication.selectors';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserIngredientService {
  private apiUrl = `${environment.apiUrl}/user-ingredient`;
  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
  ) {}

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);
  uuid: string | null = null;
  userIngredients = new BehaviorSubject<UserIngredient[]>([]);

  initializeUuid(): Observable<User | null> {
    return this.authenticationService.getUser().pipe(
      tap((resp) => {
        this.uuid = resp?.uuid || null;
        console.log(resp?.uuid);
      }),
    );
  }

  getUserIngredients(): Observable<UserIngredient[]> {
    return this.initializeUuid().pipe(
      switchMap(() => {
        if (!this.uuid) {
          console.error('UUID użytkownika nie zostało ustawione.');
          return EMPTY;
        }

        const params = new HttpParams().append('userUuid', this.uuid);
        return this.httpClient
          .get<UserIngredient[]>(`${this.apiUrl}`, {
            params,
            withCredentials: true,
          })
          .pipe(
            tap((userIngredients) => {
              this.userIngredients.next(userIngredients);
            }),
          );
      }),
    );
  }

  changeUserIngredient(
    changedIngredient: ChangeUserIngredient,
  ): Observable<Response> {
    return this.httpClient.patch<Response>(
      `${this.apiUrl}`,
      changedIngredient,
      {
        withCredentials: true,
      },
    );
  }

  deleteUserIngredient(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
