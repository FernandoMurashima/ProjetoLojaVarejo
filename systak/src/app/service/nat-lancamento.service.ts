import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NatLancamento {
  idnatureza: number;
  descricao: string;
  codigo: string;
  categoria_principal: string;
  subcategoria: string;
  tipo: string;
  status: string;
  tipo_natureza: string;
}

export type NatLancamentoCreate = Omit<NatLancamento, 'idnatureza'>;

@Injectable({
  providedIn: 'root'
})
export class NatLancamentoService {
  private apiUrl = `${environment.apiURL}/natureza-lancamento/`;

  constructor(private http: HttpClient) {}

  getNatLancamentos(): Observable<NatLancamento[]> {
    return this.http.get<NatLancamento[]>(this.apiUrl);
  }

  addNatLancamento(natLancamento: NatLancamentoCreate): Observable<NatLancamento> {
    return this.http.post<NatLancamento>(this.apiUrl, natLancamento);
  }

  updateNatLancamento(id: number, natLancamento: NatLancamento): Observable<NatLancamento> {
    return this.http.put<NatLancamento>(`${this.apiUrl}${id}/`, natLancamento);
  }

  deleteNatLancamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}

