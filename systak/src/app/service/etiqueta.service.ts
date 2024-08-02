import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://127.0.0.1:8000/produtodetalhe/unico';

  constructor(private http: HttpClient) {}

  getProdutoDetalhe(codigoBarra: string): Observable<ProdutoDetalhe> {
    const url = `${this.baseUrl}/?codigoBarra=${codigoBarra}`;
    return this.http.get<ProdutoDetalhe>(url);
  }
}
