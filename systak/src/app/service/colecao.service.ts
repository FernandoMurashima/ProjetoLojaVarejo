import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Colecao {
  Idcolecao: number;
  Descricao: string;
  Codigo: string;
  Estacao: string; // Adicione esta linha
  Contador: number; // Adicione esta linha
  Status: string;
  data_cadastro: Date;
}

type ColecaoCreate = Omit<Colecao, 'Idcolecao'>;

@Injectable({
  providedIn: 'root'
})
export class ColecaoService {
  private apiUrl = `${environment.apiURL}/colecao/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Colecao[]> {
    return this.http.get<Colecao[]>(this.apiUrl);
  }

  get(id: number): Observable<Colecao> {
    return this.http.get<Colecao>(`${this.apiUrl}${id}/`);
  }

  addColecao(colecao: ColecaoCreate): Observable<Colecao> {
    return this.http.post<Colecao>(this.apiUrl, colecao);
  }

  updateColecao(id: number, colecao: Colecao): Observable<Colecao> {
    return this.http.put<Colecao>(`${this.apiUrl}${id}/`, colecao);
  }

  deleteColecao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  updateContador(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}${id}/update_contador/`, { contador: 1 });
  }
}


