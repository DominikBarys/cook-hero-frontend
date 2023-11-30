import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import {
  Dish,
  Notification,
  Response,
  UserIngredient,
} from '../models/tutorial/tutorial.models';
import { User } from '../models/authentication/authentication.models';
import { selectAuthenticationUser } from '../../authentication/store/authentication.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.reducer';
import * as AuthenticationActions from '../../authentication/store/authentication.actions';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notification`;

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>,
    private authenticationService: AuthenticationService,
  ) {
    this.initializeNotifications().subscribe({
      next: (notifications) => {
        this.notifications.next(notifications);
      },
    });
  }

  user$: Observable<User | null> = this.store.select(selectAuthenticationUser);
  uuid: string | null = null;
  notifications = new BehaviorSubject<Notification[]>([]);

  initializeNotifications(): Observable<Notification[]> {
    return this.httpClient.get<Notification[]>(`${this.apiUrl}/all`);
  }

  initializeUuid(): Observable<User | null> {
    return this.authenticationService.getUser().pipe(
      tap((resp) => {
        this.uuid = resp?.uuid || null;
        console.log(resp?.uuid);
      }),
    );
  }

  getNotifications(): Observable<Notification[]> {
    return this.initializeUuid().pipe(
      switchMap(() => {
        if (!this.uuid) {
          console.error('UUID użytkownika nie zostało ustawione.');
          return EMPTY;
        }

        const params = new HttpParams().append('userUuid', this.uuid);
        return this.httpClient
          .get<Notification[]>(`${this.apiUrl}/all`, {
            params,
            withCredentials: true,
          })
          .pipe(
            tap((notifications) => {
              this.notifications.next(notifications);
            }),
          );
      }),
    );
  }

  deleteNotification(shortId: string): Observable<Response> {
    return this.initializeUuid().pipe(
      switchMap(() => {
        if (!this.uuid) {
          console.error('UUID użytkownika nie zostało ustawione.');
          return EMPTY;
        }

        const params = new HttpParams().append('shortId', shortId);
        return this.httpClient.delete<Response>(`${this.apiUrl}`, {
          params,
          withCredentials: true,
        });
      }),
    );
  }

  deleteAllNotifications(): Observable<Response> {
    return this.initializeUuid().pipe(
      switchMap(() => {
        if (!this.uuid) {
          console.error('UUID użytkownika nie zostało ustawione.');
          return EMPTY;
        }

        const params = new HttpParams().append('userUuid', this.uuid);
        return this.httpClient.delete<Response>(`${this.apiUrl}`, {
          params,
          withCredentials: true,
        });
      }),
    );
  }

  checkNotification(shortId: string): Observable<Response> {
    console.log('jestem w notyfikacji');
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.post<Response>(`${this.apiUrl}`, null, {
      params,
      withCredentials: true,
    });
  }
}
