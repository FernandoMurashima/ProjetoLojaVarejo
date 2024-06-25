import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Unidade {
  Idunidade: number;
  Descricao: string;
  Codigo: string;
  data_cadastro: Date;
}

type UnidadeCreate = Omit<Unidade, 'Idunidade'>;

@Injectable({
  providedIn: 'root'
})
export class UnidadeService {
  private apiUrl = `${environment.apiURL}/unidade/`;

  constructor(private http: HttpClient) {}

  // Método para carregar todas as unidades
  load(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.apiUrl);
  }

  // Método para adicionar uma nova unidade
  addUnidade(unidade: UnidadeCreate): Observable<Unidade> {
    return this.http.post<Unidade>(this.apiUrl, unidade);
  }

  // Método para atualizar uma unidade
  updateUnidade(id: number, unidade: Unidade): Observable<Unidade> {
    return this.http.put<Unidade>(`${this.apiUrl}${id}/`, unidade);
  }

  // Método para deletar uma unidade
  deleteUnidade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
