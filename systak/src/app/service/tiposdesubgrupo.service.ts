import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TiposDeSubgrupo {
  Idtipodesubgrupo: number;
  Descricao: string;
  codigosubgrupo: string;
}

@Injectable({
  providedIn: 'root'
})
export class TiposDeSubgrupoService {
  private apiUrl = `${environment.apiURL}/Tiposdesubgrupos/`;

  constructor(private http: HttpClient) {}

  load(): Observable<TiposDeSubgrupo[]> {
    return this.http.get<TiposDeSubgrupo[]>(this.apiUrl);
  }
}
