import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Despesa {
  iddespesa: number;
  idloja: number;
  data: string;
  descricao: string;
  autorizado: string;
  valor: number;
  recibo: string;
}

// Alterando o tipo aqui para aceitar o omit do ID
type DespesaCreateOrUpdate = Omit<Despesa, 'iddespesa'>;

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
  private apiUrl = `${environment.apiURL}/despesas/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Despesa[]> {
    return this.http.get<Despesa[]>(this.apiUrl);
  }

  get(id: number): Observable<Despesa> {
    return this.http.get<Despesa>(`${this.apiUrl}${id}/`);
  }

  // Ajustando para aceitar o tipo Omit<Despesa, 'iddespesa'>
  addDespesa(despesa: DespesaCreateOrUpdate): Observable<Despesa> {
    return this.http.post<Despesa>(this.apiUrl, despesa);
  }

  updateDespesa(id: number, despesa: DespesaCreateOrUpdate): Observable<Despesa> {
    return this.http.put<Despesa>(`${this.apiUrl}${id}/`, despesa);
  }

  deleteDespesa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
