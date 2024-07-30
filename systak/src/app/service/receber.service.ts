import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceberService {
  private apiUrl = `${environment.apiURL}/recebers/`;

  constructor(private http: HttpClient) {}

  createReceber(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  gravarDadosFinanceiros(dadosFinanceiros: any): Observable<any> {
    return this.http.post(`${this.apiUrl}create_financeiro/`, dadosFinanceiros);
  }
}
