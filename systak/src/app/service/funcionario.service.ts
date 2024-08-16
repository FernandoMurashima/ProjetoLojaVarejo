import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Funcionario {
  Idfuncionario: number;
  nomefuncionario: string;
  apelido: string;
  cpf: string;
  inicio: string | null;
  fim: string | null;
  categoria: string;
  data_cadastro: Date;
  idloja: number;
  meta: number;
}

type FuncionarioCreate = Omit<Funcionario, 'Idfuncionario'>;

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = `${environment.apiURL}/funcionarios/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  get(id: number): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}${id}/`);
  }

  addFuncionario(funcionario: FuncionarioCreate): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  updateFuncionario(id: number, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}${id}/`, funcionario);
  }

  deleteFuncionario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
