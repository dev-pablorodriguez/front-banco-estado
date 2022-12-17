import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BanksService {

  private apiUrl = `${environment.apiUrl}/banks`;

  constructor(private http: HttpClient) {}

  public getBanks(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
}