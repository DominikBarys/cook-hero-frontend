import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  Category,
  PostCategory,
  Response,
} from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/category`;
  categories = new BehaviorSubject<Category[]>([]);

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/all`).pipe(
      tap((categories) => {
        this.categories.next(categories);
      }),
    );
  }

  addCategory(body: PostCategory): Observable<Response> {
    return this.httpClient.post<Response>(`${this.apiUrl}`, body, {
      withCredentials: true,
    });
  }

  deleteCategory(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
