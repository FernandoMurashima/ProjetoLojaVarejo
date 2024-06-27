import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Subgrupo } from './subgrupo.service';

export interface GrupoDetalhe {
  IdGrupoDetalhe?: number;
  idgrupo: number;
  idsubgrupo: number;
}

@Injectable({
  providedIn: 'root'
})
export class GrupoDetalheService {
  private apiUrl = `${environment.apiURL}/grupodetalhes/`;

  constructor(private http: HttpClient) {}

  load(): Observable<GrupoDetalhe[]> {
    return this.http.get<GrupoDetalhe[]>(this.apiUrl);
  }

  loadByGrupo(idgrupo: number): Observable<Subgrupo[]> {
    return this.http.get<Subgrupo[]>(`${this.apiUrl}?grupo=${idgrupo}`);
  }

  addGrupoDetalhe(grupoDetalhe: GrupoDetalhe): Observable<GrupoDetalhe> {
    return this.http.post<GrupoDetalhe>(this.apiUrl, grupoDetalhe);
  }

  deleteGrupoDetalhe(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
