import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Produto {
  Idproduto?: number;
  Tipoproduto: string;
  Descricao: string;
  Desc_reduzida: string;
  classificacao_fiscal: string;
  unidade: string;
  grupo?: string;
  subgrupo?: string;
  familia?: string;
  grade?: string;
  colecao?: string;
  produto_foto?: string;
  produto_foto1?: string;
  produto_foto2?: string;
  Material?: string;
  data_cadastro: Date;
  referencia: string;
  [key: string]: any;
}

export interface ProdutoDetalhe {
  Idprodutodetalhe?: number;
  CodigodeBarra: string;
  Codigoproduto: string;
  data_cadastro?: Date;
  Idproduto: number;
  Idtamanho: number;
  Idcor: number;
  Item?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiURL}/produtos/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  get(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}${id}/`);
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}${id}/`, produto);
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  checkUniqueReference(referencia: string): Observable<boolean> {
    return this.http.get<{ isUnique: boolean }>(`${this.apiUrl}check_unique_reference/${referencia}`).pipe(
      map((response: { isUnique: boolean }) => response.isUnique)
    );
  }

  updateContador(colecaoId: number): Observable<any> {
    const url = `${environment.apiURL}/colecoes/${colecaoId}/update_contador/`;
    console.log(`Sending request to: ${url}`);
    return this.http.post<any>(url, { contador: 1 });
  }

  addProdutoDetalhe(produtoDetalhe: ProdutoDetalhe): Observable<ProdutoDetalhe> {
    return this.http.post<ProdutoDetalhe>(`${environment.apiURL}/produtodetalhes/`, produtoDetalhe);
  }
}
