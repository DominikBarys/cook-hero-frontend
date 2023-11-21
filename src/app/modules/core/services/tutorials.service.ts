import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  AddTutorialData,
  GetTutorialResponse,
  Response,
  SimpleTutorial,
  Tutorial,
} from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class TutorialsService {
  apiUrl = `${environment.apiUrl}/tutorial`;

  constructor(private httpClient: HttpClient) {}

  getTutorial(shortId: string): Observable<Tutorial> {
    const params = new HttpParams().append('_shortId', shortId);

    return this.httpClient.get<Tutorial>(`${this.apiUrl}`, {
      params,
    });
  }

  getTutorials(
    pageIndex = 1,
    itemsPerPage = 5,
    name: string | null = null,
    sortElement: string | null = null,
    order: string | null = null,
    categoryShortId: string | null = null,
    dishShortId: string | null = null,
    hasMeat: string | null = null,
    isVeganRecipe: string | null = null,
    isSweetRecipe: string | null = null,
    isSpicyRecipe: string | null = null,
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

    if (sortElement) {
      params = params.append('_sort', sortElement);
    }

    if (order) {
      params = params.append('_order', order);
    }

    if (categoryShortId) {
      params = params.append('_category', categoryShortId);
    }

    if (dishShortId) {
      params = params.append('_dish', dishShortId);
    }

    if (hasMeat) {
      params = params.append('_hasMeat', hasMeat);
    }

    if (isVeganRecipe) {
      params = params.append('_isVeganRecipe', isVeganRecipe);
    }

    if (isSweetRecipe) {
      params = params.append('_isSweetRecipe', isSweetRecipe);
    }

    if (isSpicyRecipe) {
      params = params.append('_isSpicyRecipe', isSpicyRecipe);
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

  addTutorial(addTutorialData: AddTutorialData): Observable<Response> {
    return this.httpClient.post<Response>(`${this.apiUrl}`, addTutorialData, {
      withCredentials: true,
    });
  }
}
