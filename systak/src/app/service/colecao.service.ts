import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Colecao {
  Idcolecao: number;
  Descricao: string;
  Codigo: string;
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

  // Método para carregar todas as coleções
  load(): Observable<Colecao[]> {
    return this.http.get<Colecao[]>(this.apiUrl);
  }

  // Método para adicionar uma nova coleção
  addColecao(colecao: ColecaoCreate): Observable<Colecao> {
    return this.http.post<Colecao>(this.apiUrl, colecao);
  }

  // Método para atualizar uma coleção
  updateColecao(id: number, colecao: Colecao): Observable<Colecao> {
    return this.http.put<Colecao>(`${this.apiUrl}${id}/`, colecao);
  }

  // Método para deletar uma coleção
  deleteColecao(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
