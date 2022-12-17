import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DestinatariosService {
    get headers(){
        return new HttpHeaders().set('Authorization', localStorage.getItem('token'));
    }

    private apiUrl = `${environment.apiUrl}/destinatarios`;

    constructor(private http: HttpClient) {}

    getDestinatarios(): Observable<any>{
        return this.http.get(this.apiUrl, { headers: this.headers });
    }

    createDestinatario(destinatario): Observable<any> {
        return this.http.post(this.apiUrl, destinatario, { headers: this.headers });
    }

    updateDestinatario(id: string , destinatario): Observable<any> {
        const url = `${ this.apiUrl }/${ id }`;
        return this.http.put(url, destinatario, { headers: this.headers });
    }

    deleteDestinatario(id: string): Observable<any> {
        const url = `${ this.apiUrl }/${ id }`;
        return this.http.delete(url, { headers: this.headers });
    }
}