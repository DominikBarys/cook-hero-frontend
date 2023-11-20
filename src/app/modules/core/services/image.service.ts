import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import {
  HttpClient,
  HttpEvent,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Image,
  ImageResponse,
  PostImageResponse,
  Response,
} from '../models/tutorial/tutorial.models';
import { AngularEditorConfig, UploadResponse } from '@kolkov/angular-editor';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = `${environment.apiUrl}/image`;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Wpisz opis tutaj',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize: false,
    toolbarHiddenButtons: [['insertVideo']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadWithCredentials: true,
    uploadUrl: `${this.apiUrl}`,
    upload: (file: File) => {
      return this.uploadImageViaKolkov(file);
    },
  };

  constructor(private httpClient: HttpClient) {}

  addImage(formData: FormData): Observable<Image> {
    return this.httpClient
      .post<ImageResponse>(`${this.apiUrl}`, formData, {
        withCredentials: true,
      })
      .pipe(
        map((resp) => {
          return { url: `${this.apiUrl}?shortId=${resp.shortId}` };
        }),
      );
  }

  uploadImageViaKolkov(file: File): Observable<HttpEvent<UploadResponse>> {
    const formData = new FormData();
    formData.append('multipartFile', file);

    return this.httpClient
      .post<PostImageResponse>(`${this.apiUrl}`, formData, {
        observe: 'events',
      })

      .pipe(
        map((event) => {
          if (event instanceof HttpResponse) {
            const response: PostImageResponse = event.body!;
            const uploadResponse: UploadResponse = {
              imageUrl: `${this.apiUrl}?shortId=${response.shortId}`,
            };
            return new HttpResponse<UploadResponse>({
              ...event,
              headers: event.headers,
              status: event.status,
              statusText: event.statusText,
              url: event.url || undefined,
              body: uploadResponse,
            });
          }
          return event;
        }),
      );
  }

  deleteImage(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      withCredentials: true,
      params,
    });
  }
}
