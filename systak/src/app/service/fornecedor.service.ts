import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Fornecedor {
  Idfornecedor: number;
  Nome_fornecedor: string;
  Apelido: string;
  Cnpj: string;
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
  Categoria: string;
  Bloqueio: boolean;
  MalaDireta: boolean;
  ContaContabil: string;
  data_cadastro: Date;
}

type FornecedorCreate = Omit<Fornecedor, 'Idfornecedor'>;

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = `${environment.apiURL}/fornecedores/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  get(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}${id}/`);
  }

  addFornecedor(fornecedor: FornecedorCreate): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.apiUrl, fornecedor);
  }

  updateFornecedor(id: number, fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.apiUrl}${id}/`, fornecedor);
  }

  deleteFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
