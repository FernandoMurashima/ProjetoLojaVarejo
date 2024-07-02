import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  Referencia: string;
  [key: string]: any; // Adicionando esta linha para permitir indexação dinâmica
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
}
