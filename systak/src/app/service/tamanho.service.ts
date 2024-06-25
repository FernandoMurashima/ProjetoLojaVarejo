import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Tamanho {
  Idtamanho: number;
  idgrade: number;
  Tamanho: string;
  Status: string;
  data_cadastro: Date;
}

type TamanhoCreate = Omit<Tamanho, 'Idtamanho'>;

@Injectable({
  providedIn: 'root'
})
export class TamanhoService {
  private apiUrl = `${environment.apiURL}/tamanhos/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Tamanho[]> {
    return this.http.get<Tamanho[]>(this.apiUrl);
  }

  get(id: number): Observable<Tamanho> {
    return this.http.get<Tamanho>(`${this.apiUrl}${id}/`);
  }

  addTamanho(tamanho: TamanhoCreate): Observable<Tamanho> {
    return this.http.post<Tamanho>(this.apiUrl, tamanho);
  }

  updateTamanho(id: number, tamanho: Tamanho): Observable<Tamanho> {
    return this.http.put<Tamanho>(`${this.apiUrl}${id}/`, tamanho);
  }

  deleteTamanho(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
