import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  exists(codigodebarra: string, codigoproduto: string, idtabela: number): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}exists/${codigodebarra}/${codigoproduto}/${idtabela}/`).pipe(
      map((response: { exists: boolean }) => response.exists)
    );
  }

  getPreco(codigodebarra: string): Observable<TabelaPrecoItem> {
    return this.http.get<TabelaPrecoItem>(`${this.apiUrl}preco/${codigodebarra}/`);
  }
}
