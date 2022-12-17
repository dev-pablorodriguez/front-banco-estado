import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransferenciasService {
    get headers(){
        return new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    }

    private apiUrl = `${environment.apiUrl}/transferencias`;

    constructor(private http: HttpClient) {}

    getTransferencias(): Observable<any>{
        return this.http.get(this.apiUrl, { headers: this.headers });
    }

    createTransferencia(transferencia): Observable<any> {
        return this.http.post(this.apiUrl, transferencia, { headers: this.headers });
    }
}