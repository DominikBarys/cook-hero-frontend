import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import {
  AddTutorial,
  AddTutorialData,
  CreateTutorialResponse,
  GetTutorialResponse,
  Response,
  SimpleTutorial,
  Tutorial,
} from '../models/tutorial/tutorial.models';
import { AuthenticationService } from './authentication.service';
import { User } from '../models/authentication/authentication.models';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TutorialsService {
  apiUrl = `${environment.apiUrl}/tutorial`;
  apiUrlAssistant = `${environment.apiUrl}/assistant`;
  userUuid: string | null = null;
  uuid: string | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private httpClient: HttpClient,
  ) {}

  initializeUuid(): Observable<User | null> {
    return this.authenticationService.getUser().pipe(
      tap((resp) => {
        this.uuid = resp?.uuid || null;
        console.log(resp?.uuid);
      }),
    );
  }

  getTutorial(shortId: string): Observable<Tutorial> {
    const params = new HttpParams().append('_shortId', shortId);

    return this.httpClient.get<Tutorial>(`${this.apiUrl}`, {
      params,
    });
  }

  getAssistantTutorials() {
    return this.initializeUuid().pipe(
      switchMap(() => {
        const params = new HttpParams().append('userUuid', this.uuid!);
        return this.httpClient
          .get<SimpleTutorial[]>(`${this.apiUrlAssistant}`, {
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
      }),
    );
  }

  //   return this.httpClient
  // .get<SimpleTutorial[]>(`${this.apiUrl}`, {
  // observe: 'response',
  // params,
  // })
  // .pipe(
  // map((response) => {
  // if (!response.body) return { tutorials: [], totalCount: 0 };
  // const totalCount = Number(response.headers.get('X-Total-Count'));
  //
  // return { tutorials: [...response.body], totalCount };
  // }),
  // );

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
          if (!response.body) return { tutorials: [], totalCount: 0 };
          const totalCount = Number(response.headers.get('X-Total-Count'));

          return { tutorials: [...response.body], totalCount };
        }),
      );
  }

  addTutorial(
    addTutorialData: AddTutorialData,
  ): Observable<CreateTutorialResponse> {
    return this.initializeUuid().pipe(
      switchMap(() => {
        const tutorial: AddTutorial = {
          name: addTutorialData.name,
          timeToPrepare: addTutorialData.timeToPrepare,
          difficulty: addTutorialData.difficulty,
          shortDescription: addTutorialData.shortDescription,
          dishShortId: addTutorialData.dishShortId,
          categoryShortId: addTutorialData.categoryShortId,
          hasMeat: addTutorialData.hasMeat,
          sweetRecipe: addTutorialData.sweetRecipe,
          spicyRecipe: addTutorialData.spicyRecipe,
          veganRecipe: addTutorialData.veganRecipe,
          parameters: addTutorialData.parameters,
          imagesUuid: addTutorialData.imagesUuid,
          authorUuid: this.uuid,
          mainIngredientsShortIds: addTutorialData.mainIngredientsShortIds,
        };

        return this.httpClient.post<CreateTutorialResponse>(
          `${this.apiUrl}`,
          tutorial,
          {
            withCredentials: true,
          },
        );
      }),
    );
  }

  deleteTutorial(tutorialShortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', tutorialShortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      params,
      withCredentials: true,
    });
  }
}
