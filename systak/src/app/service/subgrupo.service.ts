import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Subgrupo {
  Idsubgrupo: number;
  idgrupo: number;
  Codigo: string;
  Descricao: string;
  Margem: number;
  data_cadastro: Date;
}

@Injectable({
  providedIn: 'root'
})
export class SubgrupoService {
  private apiUrl = `${environment.apiURL}/subgrupos/`;

  constructor(private http: HttpClient) {}

  loadByGrupo(grupoId: string): Observable<Subgrupo[]> {
    const url = `${this.apiUrl}?grupoId=${grupoId}`;
    return this.http.get<Subgrupo[]>(url);
  }

  get(id: number): Observable<Subgrupo> {
    return this.http.get<Subgrupo>(`${this.apiUrl}${id}/`);
  }

  addSubgrupo(subgrupo: Subgrupo): Observable<Subgrupo> {
    return this.http.post<Subgrupo>(this.apiUrl, subgrupo);
  }

  updateSubgrupo(id: number, subgrupo: Subgrupo): Observable<Subgrupo> {
    return this.http.put<Subgrupo>(`${this.apiUrl}${id}/`, subgrupo);
  }

  deleteSubgrupo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
