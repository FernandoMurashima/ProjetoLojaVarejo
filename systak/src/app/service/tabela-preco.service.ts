import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TabelaPreco {
  Idtabela: number;
  NomeTabela: string;
  DataInicio: Date;
  DataFim: Date;
  Promocao: string;
  data_cadastro: Date;
}

type TabelaPrecoCreate = Omit<TabelaPreco, 'Idtabela'>;

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoService {
  private apiUrl = `${environment.apiURL}/tabelas/`;

  constructor(private http: HttpClient) {}

  load(): Observable<TabelaPreco[]> {
    return this.http.get<TabelaPreco[]>(this.apiUrl);
  }

  get(id: number): Observable<TabelaPreco> {
    return this.http.get<TabelaPreco>(`${this.apiUrl}${id}/`);
  }

  addTabelaPreco(tabelaPreco: TabelaPrecoCreate): Observable<TabelaPreco> {
    return this.http.post<TabelaPreco>(this.apiUrl, tabelaPreco);
  }

  updateTabelaPreco(id: number, tabelaPreco: TabelaPreco): Observable<TabelaPreco> {
    return this.http.put<TabelaPreco>(`${this.apiUrl}${id}/`, tabelaPreco);
  }

  deleteTabelaPreco(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
