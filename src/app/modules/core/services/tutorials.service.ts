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
    name: string | null = null,
  ): Observable<GetTutorialResponse> {
    let params = new HttpParams()
      .append('_page', pageIndex)
      .append('_limit', itemsPerPage);

    //todo trzeba dodać enkodowanie url bo może nie poradzić sobie z polskimi znakami
    if (name) {
      //todo jednak z tym nie dzialalo do konca dobrze

      // const encodedName = encodeURIComponent(name);
      params = params.append('name_like', name);
    }

    return this.httpClient
      .get<SimpleTutorial[]>(`${this.apiUrl}`, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          // if (name === '') {
          //   return { tutorials: [], totalCount: 0 };
          // }
          if (!response.body) return { tutorials: [], totalCount: 0 };
          const totalCount = Number(response.headers.get('X-Total-Count'));

          return { tutorials: [...response.body], totalCount };
        }),
      );
  }
}
