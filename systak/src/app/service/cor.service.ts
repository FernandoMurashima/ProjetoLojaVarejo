import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Cor {
  Idcor: number;
  Descricao: string;
  Codigo: string;
  Cor: string;
  Status: string;
  data_cadastro: Date;
}

type CorCreate = Omit<Cor, 'Idcor'>;

@Injectable({
  providedIn: 'root'
})
export class CorService {
  private apiUrl = `${environment.apiURL}/cores/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Cor[]> {
    return this.http.get<Cor[]>(this.apiUrl);
  }

  get(id: number): Observable<Cor> {
    return this.http.get<Cor>(`${this.apiUrl}${id}/`);
  }

  addCor(cor: CorCreate): Observable<Cor> {
    return this.http.post<Cor>(this.apiUrl, cor);
  }

  updateCor(id: number, cor: Cor): Observable<Cor> {
    return this.http.put<Cor>(`${this.apiUrl}${id}/`, cor);
  }

  deleteCor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
