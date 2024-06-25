import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Grade {
  Idgrade: number;
  Descricao: string;
  Status: string;
  data_cadastro: Date;
}

type GradeCreate = Omit<Grade, 'Idgrade'>;

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private apiUrl = `${environment.apiURL}/grades/`;

  constructor(private http: HttpClient) {}

  // Método para carregar grades ativas
  loadActive(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}?status=ativo`);
  }

  // Método para carregar todas as grades
  load(): Observable<Grade[]> {
    return this.http.get<Grade[]>(this.apiUrl);
  }

  // Método para adicionar uma nova grade
  addGrade(grade: GradeCreate): Observable<Grade> {
    return this.http.post<Grade>(this.apiUrl, grade);
  }

  // Método para atualizar uma grade
  updateGrade(id: number, grade: Grade): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiUrl}${id}/`, grade);
  }

  // Método para deletar uma grade
  deleteGrade(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
