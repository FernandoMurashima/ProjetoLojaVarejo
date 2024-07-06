import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Codigo {
  id?: number;
  variavel: string;
  valor: string;
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
}
