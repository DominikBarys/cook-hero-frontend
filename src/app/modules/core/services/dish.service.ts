import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Dish,
  PostCategory,
  Response,
} from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = `${environment.apiUrl}/dish`;

  constructor(private httpClient: HttpClient) {}

  dishes = new BehaviorSubject<Dish[]>([]);

  getDishes(): Observable<Dish[]> {
    return this.httpClient.get<Dish[]>(`${this.apiUrl}/all`).pipe(
      tap((dishes) => {
        this.dishes.next(dishes);
      }),
    );
  }

  addDish(body: PostCategory): Observable<Response> {
    return this.httpClient.post<Response>(`${this.apiUrl}`, body, {
      withCredentials: true,
    });
  }

  deleteDish(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
