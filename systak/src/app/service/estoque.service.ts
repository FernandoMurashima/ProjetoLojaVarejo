import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importar 'map'
import { environment } from '../../environments/environment';

export interface Estoque {
  Idestoque?: number;
  CodigodeBarra: string;
  codigoproduto: string;
  Idloja: number;
  Estoque: number;
  reserva: number;
  valorestoque: number;
}

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  private apiUrl = `${environment.apiURL}/estoques/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Estoque[]> {
    return this.http.get<Estoque[]>(this.apiUrl);
  }

  get(id: number): Observable<Estoque> {
    return this.http.get<Estoque>(`${this.apiUrl}${id}/`);
  }

  addEstoque(estoque: Estoque): Observable<Estoque> {
    return this.http.post<Estoque>(this.apiUrl, estoque);
  }

  updateEstoque(id: number, estoque: Estoque): Observable<Estoque> {
    return this.http.put<Estoque>(`${this.apiUrl}${id}/`, estoque);
  }

  deleteEstoque(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  exists(codigodebarra: string, codigoproduto: string, idloja: number): Observable<boolean> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}exists/${codigodebarra}/${codigoproduto}/${idloja}/`).pipe(
      map((response: { exists: boolean }) => response.exists)
    );
  }
}
