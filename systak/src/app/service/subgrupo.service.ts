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

type SubgrupoCreate = Omit<Subgrupo, 'Idsubgrupo'>;

@Injectable({
  providedIn: 'root'
})
export class SubgrupoService {
  private subgrupoApiUrl = `${environment.apiURL}/subgrupos/`;

  constructor(private http: HttpClient) {}

  loadByGrupo(idgrupo: number): Observable<Subgrupo[]> {
    return this.http.get<Subgrupo[]>(`${this.subgrupoApiUrl}?idgrupo=${idgrupo}`);
  }

  addSubgrupo(subgrupo: SubgrupoCreate): Observable<Subgrupo> {
    return this.http.post<Subgrupo>(this.subgrupoApiUrl, subgrupo);
  }

  deleteSubgrupos(idgrupo: number): Observable<any> {
    return this.http.delete(`${this.subgrupoApiUrl}?idgrupo=${idgrupo}`);
  }
}
