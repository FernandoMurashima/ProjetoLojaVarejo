import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Codigo {
  Idcodigo: number;
  variavel: string;
  valor_var: string;
}

@Injectable({
  providedIn: 'root'
})
export class CodigoService {
  private apiUrl = `${environment.apiURL}/codigos/`;

  constructor(private http: HttpClient) {}

  getEmpresaCodigo(): Observable<Codigo> {
    return this.http.get<Codigo>(`${this.apiUrl}empresa/`);
  }

  incrementEmpresaCodigo(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}empresa/increment/`, {});
  }

  getCodigo(variavel: string): Observable<Codigo[]> {
    return this.http.get<Codigo[]>(`${this.apiUrl}?variavel=${variavel}`);
  }

  incrementarCodigo(variavel: string): Observable<void> {
    const body = new FormData();
    body.append('variavel', variavel);
    return this.http.post<void>(`${this.apiUrl}incrementar/`, body);
  }
}
