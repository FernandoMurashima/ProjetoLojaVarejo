import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';

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

export interface TabelaPrecoItem {
  codigoproduto: string;
  codigodebarra: string;
  preco: number;
  idtabela: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiURL}/produtos/`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Substitua pelo seu método de obtenção do token
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  load(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  get(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto, { headers: this.getHeaders() });
  }

  updateProduto(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}${id}/`, produto, { headers: this.getHeaders() });
  }

  deleteProduto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, { headers: this.getHeaders() });
  }

  checkUniqueReference(referencia: string): Observable<boolean> {
    return this.http.get<{ isUnique: boolean }>(`${this.apiUrl}check_unique_reference/${referencia}`, { headers: this.getHeaders() }).pipe(
      map((response: { isUnique: boolean }) => response.isUnique)
    );
  }

  updateContador(colecaoId: number): Observable<any> {
    const url = `${environment.apiURL}/colecoes/${colecaoId}/update_contador/`;
    console.log(`Sending request to: ${url}`);
    return this.http.post<any>(url, { contador: 1 }, { headers: this.getHeaders() });
  }

  addProdutoDetalhe(produtoDetalhe: ProdutoDetalhe): Observable<ProdutoDetalhe> {
    return this.http.post<ProdutoDetalhe>(`${environment.apiURL}/produtodetalhes/`, produtoDetalhe, { headers: this.getHeaders() });
  }

  addTabelaPrecoItem(tabelaPrecoItem: TabelaPrecoItem): Observable<TabelaPrecoItem> {
    console.log('Adicionando item da tabela de preço:', tabelaPrecoItem); // Adiciona log para o item da tabela de preço
    return this.http.post<TabelaPrecoItem>(`${environment.apiURL}/tabelaprecoitems/`, tabelaPrecoItem, { headers: this.getHeaders() });
  }

  addEstoque(estoque: any): Observable<any> {
    console.log('Adicionando estoque:', estoque); // Adiciona log para o estoque
    return this.http.post<any>(`${environment.apiURL}/estoques/`, estoque, { headers: this.getHeaders() });
  }

  getDetalhesByReferencia(referencia: string): Observable<ProdutoDetalhe[]> {
    return this.http.get<ProdutoDetalhe[]>(`${environment.apiURL}/produtos/detalhes/${referencia}/`, { headers: this.getHeaders() });
  }

  buscarPorCodigoBarra(codigoBarra: string): Observable<ProdutoDetalhe> {
    console.log(`Buscando ProdutoDetalhe com código de barra: ${codigoBarra}`);
    return this.http.get<ProdutoDetalhe[]>(`${environment.apiURL}/produtodetalhes/?codigoBarra=${codigoBarra}`, { headers: this.getHeaders() }).pipe(
      tap((data: ProdutoDetalhe[]) => {
        console.log(`Resposta da API para código de barra ${codigoBarra}:`, data);
      }),
      map((data: ProdutoDetalhe[]) => {
        if (data.length > 0) {
          return data.find(item => item.CodigodeBarra === codigoBarra) || {} as ProdutoDetalhe;
        }
        return {} as ProdutoDetalhe;
      })
    );
  }

  getDetalhesByCodigoDeBarra(codigoDeBarra: string): Observable<ProdutoDetalhe> {
    return this.http.get<ProdutoDetalhe>(`${environment.apiURL}/produtodetalhes/${codigoDeBarra}/`, { headers: this.getHeaders() });
  }

  getProdutoDescricaoPorId(idProduto: number): Observable<Produto> {
    console.log(`Buscando descrição do produto com ID: ${idProduto}`);
    return this.http.get<Produto>(`${this.apiUrl}${idProduto}/`, { headers: this.getHeaders() });
  }
}
