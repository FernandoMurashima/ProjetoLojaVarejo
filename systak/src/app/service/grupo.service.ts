import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Grupo {
  Idgrupo: number;
  Codigo: string;
  Descricao: string;
  Margem: number;
  data_cadastro: Date;
}

type GrupoCreate = Omit<Grupo, 'Idgrupo'>;

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private apiUrl = `${environment.apiURL}/grupos/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.apiUrl);
  }

  get(id: number): Observable<Grupo> {
    return this.http.get<Grupo>(`${this.apiUrl}${id}/`);
  }

  addGrupo(grupo: GrupoCreate): Observable<Grupo> {
    return this.http.post<Grupo>(this.apiUrl, grupo);
  }

  updateGrupo(id: number, grupo: Grupo): Observable<Grupo> {
    return this.http.put<Grupo>(`${this.apiUrl}${id}/`, grupo);
  }

  deleteGrupo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
