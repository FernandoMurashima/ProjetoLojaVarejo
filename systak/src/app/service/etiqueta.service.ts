import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface ProdutoDetalhe {
  Idprodutodetalhe: number;
  CodigodeBarra: string;
  Codigoproduto: string;
  descricao: string;
  tamanho: string;
  cor: string;
}

@Injectable({
  providedIn: 'root',
})
export class EtiquetaService {
  private baseUrl = `${environment.apiURL}/produtodetalhe/unico`;
  private apiUrl = `${environment.apiURL}/colecoes/`; 

  constructor(private http: HttpClient) {}

  getProdutoDetalhe(codigoBarra: string): Observable<ProdutoDetalhe> {
    const url = `${this.baseUrl}/?codigoBarra=${codigoBarra}`;
    return this.http.get<ProdutoDetalhe>(url);
  }

  getProdutosPorLoja(url: string): Observable<ProdutoDetalhe[]> {
    return this.http.get<ProdutoDetalhe[]>(url);
  }

  getColecoes(): Observable<any[]> {
    const url = `${environment.apiURL}/colecoes/`;
    return this.http.get<any[]>(url);
  }

  getProdutosPorColecao(colecaoId: number): Observable<ProdutoDetalhe[]> {
    const url = `${environment.apiURL}/produtos/colecao/${colecaoId}/`;
    return this.http.get<ProdutoDetalhe[]>(url);
  }
}
