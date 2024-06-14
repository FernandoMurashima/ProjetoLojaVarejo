import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Loja {
  Idloja: number;
  nome_loja: string;
  Apelido_loja: string;
  cnpj: string;
  Logradouro: string;
  Endereco: string;
  numero: string;
  Complemento: string;
  Cep: string;
  Bairro: string;
  Cidade: string;
  Telefone1: string;
  Telefone2: string;
  email: string;
  EstoqueNegativo: string;
  Rede: string;
  DataAbertura: string | null;
  ContaContabil: string;
  DataEnceramento: string | null;
  Matriz: string;
  data_cadastro: Date;
}

type LojaCreate = Omit<Loja, 'Idloja'>;

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private apiUrl = `${environment.apiURL}/lojas/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Loja[]> {
    return this.http.get<Loja[]>(this.apiUrl);
  }

  get(id: number): Observable<Loja> {
    return this.http.get<Loja>(`${this.apiUrl}${id}/`);
  }

  addLoja(loja: LojaCreate): Observable<Loja> {
    return this.http.post<Loja>(this.apiUrl, loja);
  }

  updateLoja(id: number, loja: Loja): Observable<Loja> {
    return this.http.put<Loja>(`${this.apiUrl}${id}/`, loja);
  }

  deleteLoja(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
