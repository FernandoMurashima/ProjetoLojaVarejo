import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TabelaPrecoItem {
  Idtabelaitem?: number;
  codigoproduto: string;
  codigodebarra: string;
  preco: number;
  idtabela: number;
}

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoItemService {
  private apiUrl = `${environment.apiURL}/tabelaprecoitems/`;

  constructor(private http: HttpClient) {}

  addTabelaPrecoItem(tabelaPrecoItem: TabelaPrecoItem): Observable<TabelaPrecoItem> {
    return this.http.post<TabelaPrecoItem>(this.apiUrl, tabelaPrecoItem);
  }
}
