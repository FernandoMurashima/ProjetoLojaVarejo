import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Familia {
  Idfamilia: number;
  Descricao: string;
  Codigo: string;
  data_cadastro: Date;
}

type FamiliaCreate = Omit<Familia, 'Idfamilia'>;

@Injectable({
  providedIn: 'root'
})
export class FamiliaService {
  private apiUrl = `${environment.apiURL}/familia/`;

  constructor(private http: HttpClient) {}

  // Método para carregar todas as famílias
  load(): Observable<Familia[]> {
    return this.http.get<Familia[]>(this.apiUrl);
  }

  // Método para adicionar uma nova família
  addFamilia(familia: FamiliaCreate): Observable<Familia> {
    return this.http.post<Familia>(this.apiUrl, familia);
  }

  // Método para atualizar uma família
  updateFamilia(id: number, familia: Familia): Observable<Familia> {
    return this.http.put<Familia>(`${this.apiUrl}${id}/`, familia);
  }

  // Método para deletar uma família
  deleteFamilia(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
