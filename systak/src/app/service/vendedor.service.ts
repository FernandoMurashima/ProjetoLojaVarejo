import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Vendedor {
  Idvendedor: number;
  nomevendedor: string;
  apelido: string;
  cpf: string;
  aniversario: Date;
  fim: Date;
  categoria: string;
  data_cadastro: Date;
  idloja: number;
}

@Injectable({
  providedIn: 'root'
})
export class VendedorService {
  private apiUrl = `${environment.apiURL}/vendedores/`;

  constructor(private http: HttpClient) {}

  load(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.apiUrl);
  }

  get(id: number): Observable<Vendedor> {
    return this.http.get<Vendedor>(`${this.apiUrl}/${id}/`);
  }

  addVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(this.apiUrl, vendedor);
  }

  updateVendedor(id: number, vendedor: Vendedor): Observable<Vendedor> {
    return this.http.put<Vendedor>(`${this.apiUrl}${id}/`, vendedor);
  }

  deleteVendedor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
