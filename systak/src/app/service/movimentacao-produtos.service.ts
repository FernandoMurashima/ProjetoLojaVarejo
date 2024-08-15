import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface MovimentacaoProdutos {
  Idloja: number;
  Data_mov: string;
  Documento: string;
  Tipo: string;
  Qtd: number;
  Valor: number;
  data_cadastro: string;
  CodigodeBarra: string;
  codigoproduto: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoProdutosService {
  private baseUrl = `${environment.apiURL}/movimentacoesprodutos/`;

  constructor(private http: HttpClient) { }

  createMovimentacao(data: MovimentacaoProdutos): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}
