import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Material {
  Idmaterial: number;
  Descricao: string;
  Codigo: string;
  Status: string;
  data_cadastro: Date;
}

type MaterialCreate = Omit<Material, 'Idmaterial'>;

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = `${environment.apiURL}/material/`;

  constructor(private http: HttpClient) {}

  // Método para carregar materiais ativos
  loadActive(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}?status=ativo`);
  }

  // Método para carregar todos os materiais
  load(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }

  // Método para adicionar um novo material
  addMaterial(material: MaterialCreate): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  // Método para atualizar um material
  updateMaterial(id: number, material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}${id}/`, material);
  }

  // Método para deletar um material
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
