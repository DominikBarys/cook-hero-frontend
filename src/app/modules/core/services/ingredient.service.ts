import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Ingredient,
  PostCategory,
  Response,
} from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private apiUrl = `${environment.apiUrl}/ingredient`;
  ingredients = new BehaviorSubject<Ingredient[]>([]);

  constructor(private httpClient: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(`${this.apiUrl}/all`).pipe(
      tap((ingredients) => {
        this.ingredients.next(ingredients);
      }),
    );
  }

  addIngredient(body: PostCategory): Observable<Response> {
    return this.httpClient.post<Response>(`${this.apiUrl}`, body, {
      withCredentials: true,
    });
  }

  deleteIngredient(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
