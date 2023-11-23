import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Dish, Page, Response } from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = `${environment.apiUrl}/page`;

  pages = new BehaviorSubject<Page[]>([]);

  constructor(private httpClient: HttpClient) {}

  getPages(body: string): Observable<Page[]> {
    const params = new HttpParams().append('tutorialShortId', body);

    return this.httpClient
      .get<Page[]>(`${this.apiUrl}/all`, {
        withCredentials: true,
        params,
      })
      .pipe(
        tap((pages) => {
          this.pages.next(pages);
        }),
      );
  }

  addPage(body: Page): Observable<Response> {
    // console.log('jestem w add page');
    // console.log(body);
    return this.httpClient.post<Response>(`${this.apiUrl}`, body, {
      withCredentials: true,
    });
  }

  deletePage(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
