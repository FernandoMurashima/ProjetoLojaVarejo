import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovimentacaoFinanceira {
  Idconta: number;
  data_movimento: string;
  Titulo: string;
  TipoMov: string;
  TipoFluxo: string;
  valor: number;
  data_baixa: string | null;
  data_cadastro: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoFinanceiraService {
  private baseUrl = `${environment.apiURL}/movimentacoesfinanceiras/`;

  constructor(private http: HttpClient) { }

  createMovimentacao(data: MovimentacaoFinanceira): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
