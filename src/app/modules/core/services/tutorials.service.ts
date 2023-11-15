import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutorialsService {
  apiUrl = `${environment.apiUrl}/tutorials`;

  constructor(private httpClient: HttpClient) {}

  getTutorials(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}`);
  }
}
