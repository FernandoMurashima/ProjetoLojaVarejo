import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface NatLancamento {
  id: number;
  descricao: string;
  codigo: string;
}

@Injectable({
  providedIn: 'root'
})
export class NatLancamentoService {
  private apiUrl = `${environment.apiURL}/natureza_lancamentos/`;

  constructor(private http: HttpClient) {}

  getNatLancamentos(): Observable<NatLancamento[]> {
    return this.http.get<NatLancamento[]>(this.apiUrl);
  }
}
