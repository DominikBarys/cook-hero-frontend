import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  GetTutorialResponse,
  SimpleTutorial,
} from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class TutorialsService {
  apiUrl = `${environment.apiUrl}/tutorial`;

  constructor(private httpClient: HttpClient) {}

  getTutorials(
    pageIndex = 1,
    itemsPerPage = 5,
  ): Observable<GetTutorialResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);

    return this.httpClient
      .get<SimpleTutorial[]>(`${this.apiUrl}`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          if (!response.body) return { tutorials: [], totalCount: 0 };
          const totalCount = Number(response.headers.get('X-Total-Count'));

          return { tutorials: [...response.body], totalCount };
        }),
      );
  }
}
