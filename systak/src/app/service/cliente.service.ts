import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Cliente {
  Idcliente: number;
  Nome_cliente: string;
  Apelido: string;
  cpf: string;
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
  Bloqueio: boolean;
  MalaDireta: boolean;
  Aniversario: Date | null;
  Categoria: string;
  ContaContabil: string;
  data_cadastro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiURL}/clientes/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  get(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}${id}/`);
  }

  addCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, cliente);
  }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}${id}/`, cliente);
  }

  deleteCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
