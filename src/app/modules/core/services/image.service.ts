import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  Image,
  ImageResponse,
  Response,
} from '../models/tutorial/tutorial.models';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  apiUrl = `${environment.apiUrl}/image`;

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

  deleteImage(shortId: string): Observable<Response> {
    const params = new HttpParams().append('shortId', shortId);
    return this.httpClient.delete<Response>(`${this.apiUrl}`, {
      withCredentials: true,
      params,
    });
  }
}
