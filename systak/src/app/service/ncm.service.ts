import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Ncm {
  id: number;
  ncm: string;
  campo1?: string;
  descricao: string;
  aliquota?: string;
}

type NcmCreate = Omit<Ncm, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class NcmService {
  private apiUrl = `${environment.apiURL}/ncms/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Ncm[]> {
    return this.http.get<Ncm[]>(this.apiUrl);
  }

  get(id: number): Observable<Ncm> {
    return this.http.get<Ncm>(`${this.apiUrl}${id}/`);
  }

  addNcm(ncm: NcmCreate): Observable<Ncm> {
    return this.http.post<Ncm>(this.apiUrl, ncm);
  }

  updateNcm(id: number, ncm: Ncm): Observable<Ncm> {
    return this.http.put<Ncm>(`${this.apiUrl}${id}/`, ncm);
  }

  deleteNcm(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
