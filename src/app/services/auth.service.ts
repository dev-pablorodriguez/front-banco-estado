import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

import { LoginResponse } from '../interfaces/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  public login(rut: string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.apiUrl, { rut, password });
  }

  public setJwtToken(token: string){
    localStorage.setItem('token', token);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    // Check if the token is expired and return
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }

  public cerrarSesion(){
    localStorage.removeItem('token');
  }
}