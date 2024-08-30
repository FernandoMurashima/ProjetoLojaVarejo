import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  private apiUrl = `${environment.apiURL}/caixas/`;

  constructor(private http: HttpClient) { }

  abrirCaixa(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  fecharCaixa(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}${id}/`, { status: 'F' });  // Faz um PATCH para atualizar o status
  }

  // Outros métodos, como consultarCaixa, etc.
}
